import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { authMiddleware, requireRole } from '../middlewares/auth.middleware';
import { prisma } from '../lib/prisma';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';
import crypto from 'crypto';

export async function mediaRoutes(fastify: FastifyInstance) {
  // PUBLIC: GET gallery items (no auth required)
  fastify.get('/gallery', {
    handler: async (request: FastifyRequest<{ Querystring: { type?: string } }>, reply) => {
      const where: any = { showInGallery: true };
      if (request.query.type) where.type = request.query.type;
      const items = await prisma.media.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        select: { id: true, filename: true, url: true, type: true, alt: true },
      });
      return reply.send({ data: items });
    },
  });

  // GET all media (paginated, requires auth)
  fastify.get('/', {
    preHandler: [authMiddleware],
    handler: async (request: FastifyRequest<{ Querystring: { page?: string; type?: string } }>, reply) => {
      const page = Number(request.query.page || 1);
      const limit = 20;
      const [items, total] = await Promise.all([
        prisma.media.findMany({
          where: request.query.type ? { type: request.query.type } : {},
          orderBy: { createdAt: 'desc' },
          skip: (page - 1) * limit,
          take: limit,
        }),
        prisma.media.count({
          where: request.query.type ? { type: request.query.type } : {},
        }),
      ]);
      return reply.send({ data: items, total, page, totalPages: Math.ceil(total / limit) });
    },
  });

  // POST upload media via multipart
  fastify.post('/upload', {
    preHandler: [authMiddleware, requireRole('ADMIN', 'EDITOR', 'SUPER_ADMIN')],
    handler: async (request, reply) => {
      const data = await request.file();
      if (!data) return reply.status(400).send({ error: 'No file uploaded' });

      const allowedImageMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
      if (!allowedImageMimes.includes(data.mimetype)) {
         return reply.status(400).send({ error: 'Unsupported file type' });
      }

      const ext = path.extname(data.filename) || '.jpg';
      const filename = `${crypto.randomUUID()}${ext}`;
      const uploadsDir = path.join(__dirname, '../../public/uploads');
      const filepath = path.join(uploadsDir, filename);

      await pipeline(data.file, fs.createWriteStream(filepath));

      const host = request.headers.host || process.env.BACKEND_URL?.replace(/^https?:\/\//, '') || 'localhost:4000';
      const fileUrl = `${request.protocol}://${host}/uploads/${filename}`;
      const sizeBytes = fs.statSync(filepath).size;

      const media = await prisma.media.create({
        data: {
          filename: data.filename,
          url: fileUrl,
          type: 'image',
          size: sizeBytes,
          mimeType: data.mimetype,
        }
      });

      return reply.status(201).send({ data: media });
    },
  });

  // POST upload from URL
  fastify.post('/upload-url', {
    preHandler: [authMiddleware, requireRole('ADMIN', 'EDITOR', 'SUPER_ADMIN')],
    handler: async (request: FastifyRequest<{ Body: { url: string } }>, reply) => {
      const { url } = request.body;
      if (!url) return reply.status(400).send({ error: 'URL is required' });

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
        
        const contentType = response.headers.get('content-type') || 'image/jpeg';
        const ext = contentType.split('/')[1] || 'jpg';
        const filename = `${crypto.randomUUID()}.${ext}`;
        const uploadsDir = path.join(__dirname, '../../public/uploads');
        const filepath = path.join(uploadsDir, filename);

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        fs.writeFileSync(filepath, buffer);

        const host = request.headers.host || process.env.BACKEND_URL?.replace(/^https?:\/\//, '') || 'localhost:4000';
        const fileUrl = `${request.protocol}://${host}/uploads/${filename}`;
        
        const media = await prisma.media.create({
          data: {
            filename: `url-download.${ext}`,
            url: fileUrl,
            type: 'image',
            size: buffer.byteLength,
            mimeType: contentType,
          }
        });

        return reply.status(201).send({ data: media });
      } catch (err: any) {
        return reply.status(400).send({ error: err.message || 'Failed to download image from URL' });
      }
    }
  });

  // POST register media (for external videos or manually registering already uploaded media)
  fastify.post('/register', {
    preHandler: [authMiddleware],
    handler: async (request, reply) => {
      let { filename, url, type, size, mimeType, alt } = request.body as {
        filename: string; url: string; type: string; size: number; mimeType: string; alt?: string;
      };

      // Extract YouTube Video ID and fetch high-res thumbnail
      if (type === 'video') {
        const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
        if (ytMatch && ytMatch[1]) {
          const videoId = ytMatch[1];
          // Use auto-generated mid-video frames (hq1 or hq2) to avoid misleading custom thumbnails like clickbait covers
          const thumbUrls = [
            `https://img.youtube.com/vi/${videoId}/hq1.jpg`,
            `https://img.youtube.com/vi/${videoId}/hq2.jpg`,
            `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
            `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
          ];
          
          let fetchedBuffer: ArrayBuffer | null = null;
          for (const tUrl of thumbUrls) {
            try {
              const response = await fetch(tUrl);
              if (response.ok) {
                fetchedBuffer = await response.arrayBuffer();
                break;
              }
            } catch (err) {
              // try next
            }
          }

          if (fetchedBuffer) {
            try {
              const buffer = Buffer.from(fetchedBuffer);
              const ext = 'jpg';
              const thumbFilename = `yt-${videoId}-${crypto.randomUUID()}.${ext}`;
              const uploadsDir = path.join(__dirname, '../../public/uploads');
              
              if (!fs.existsSync(uploadsDir)) {
                fs.mkdirSync(uploadsDir, { recursive: true });
              }
              
              const filepath = path.join(uploadsDir, thumbFilename);
              fs.writeFileSync(filepath, buffer);
              
              const host = request.headers.host || process.env.BACKEND_URL?.replace(/^https?:\/\//, '') || 'localhost:4000';
              alt = `${request.protocol}://${host}/uploads/${thumbFilename}`;
            } catch (err) {
              console.error('Failed to save youtube thumbnail:', err);
            }
          }
        }
      }

      const media = await prisma.media.create({ 
        data: { filename, url, type, size, mimeType, alt } 
      });
      return reply.status(201).send({ data: media });
    },
  });

  // DELETE media
  fastify.delete('/:id', {
    preHandler: [authMiddleware],
    handler: async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
      const media = await prisma.media.findUnique({ where: { id: request.params.id } });
      if (!media) return reply.status(404).send({ error: 'Media not found' });

      // Physical delete if it is local
      if (media.url.includes('/uploads/')) {
        const filename = media.url.split('/').pop();
        if (filename) {
          const filepath = path.join(__dirname, '../../public/uploads', filename);
          if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
          }
        }
      }

      await prisma.media.delete({ where: { id: request.params.id } });
      return reply.send({ message: 'Media deleted' });
    },
  });

  // PATCH media (update showInGallery flag)
  fastify.patch('/:id', {
    preHandler: [authMiddleware],
    handler: async (request: FastifyRequest<{ Params: { id: string }; Body: { showInGallery?: boolean } }>, reply) => {
      const media = await prisma.media.findUnique({ where: { id: request.params.id } });
      if (!media) return reply.status(404).send({ error: 'Media not found' });

      const updated = await prisma.media.update({
        where: { id: request.params.id },
        data: { showInGallery: request.body.showInGallery ?? !media.showInGallery },
      });
      return reply.send({ data: updated });
    },
  });
  //tambahkan add media file pdf
  fastify.post('/upload-pdf', {
    preHandler: [authMiddleware],
    handler: async (request: FastifyRequest<{ Body: { file: any } }>, reply) => {
      const data = await request.file();
      if (!data) return reply.status(400).send({ error: 'No file uploaded' });

      const allowedImageMimes = [
        'application/pdf', 
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      if (!allowedImageMimes.includes(data.mimetype)) {
         return reply.status(400).send({ error: 'Unsupported file type' });
      }

      const ext = path.extname(data.filename) || '.pdf';
      const filename = `${crypto.randomUUID()}${ext}`;
      const uploadsDir = path.join(__dirname, '../../public/uploads');
      const filepath = path.join(uploadsDir, filename);

      await pipeline(data.file, fs.createWriteStream(filepath));

      const host = request.headers.host || process.env.BACKEND_URL?.replace(/^https?:\/\//, '') || 'localhost:4000';
      const fileUrl = `${request.protocol}://${host}/uploads/${filename}`;
      const sizeBytes = fs.statSync(filepath).size;

      const media = await prisma.media.create({
        data: {
          filename: data.filename,
          url: fileUrl,
          type: 'pdf',
          size: sizeBytes,
          mimeType: data.mimetype,
        }
      });

      return reply.status(201).send({ data: media });
    },
  }); 

  // POST upload pdf from URL
  fastify.post('/upload-pdf-url', {
    preHandler: [authMiddleware, requireRole('ADMIN', 'EDITOR', 'SUPER_ADMIN')],
    handler: async (request: FastifyRequest<{ Body: { url: string } }>, reply) => {
      const { url } = request.body;
      if (!url) return reply.status(400).send({ error: 'URL is required' });

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch PDF: ${response.statusText}`);
        
        const contentType = response.headers.get('content-type') || 'application/pdf';
        const ext = 'pdf';
        const filename = `${crypto.randomUUID()}.${ext}`;
        const uploadsDir = path.join(__dirname, '../../public/uploads');
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }
        const filepath = path.join(uploadsDir, filename);

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        fs.writeFileSync(filepath, buffer);

        const host = request.headers.host || process.env.BACKEND_URL?.replace(/^https?:\/\//, '') || 'localhost:4000';
        const fileUrl = `${request.protocol}://${host}/uploads/${filename}`;
        
        const media = await prisma.media.create({
          data: {
            filename: `url-download.${ext}`,
            url: fileUrl,
            type: 'pdf',
            size: buffer.byteLength,
            mimeType: contentType,
          }
        });

        return reply.status(201).send({ data: media });
      } catch (err: any) {
        return reply.status(400).send({ error: err.message || 'Failed to download PDF from URL' });
      }
    }
  });

}
