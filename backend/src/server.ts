import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import multipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

import { postsRoutes } from './routes/posts.route';
import { blocksRoutes } from './routes/blocks.route';
import { mediaRoutes } from './routes/media.route';
import { settingsRoutes } from './routes/settings.route';
import { chatbotRoutes } from './routes/chatbot.route';
import { worksRoutes } from './routes/works.route';
import { authRoutes } from './routes/auth.route';
import { karyaRoutes } from './routes/karya.route';
import { prisma } from './lib/prisma';

const server = Fastify({ logger: true });

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:3002').split(',');
const PORT = Number(process.env.PORT) || 4000;

async function bootstrap() {
  // ── Security ──────────────────────────────
  await server.register(helmet, {
    global: true,
    crossOriginResourcePolicy: false,
  });

  await server.register(cors, {
    origin: (origin, cb) => {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        cb(null, true);
      } else {
        cb(new Error('Forbidden by CORS'), false);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  await server.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });

  // ── File upload support ────────────────────
  await server.register(multipart, {
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  });

  // Serve static uploads
  const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  await server.register(fastifyStatic, {
    root: uploadsDir,
    prefix: '/uploads/',
  });

  // ── Routes ────────────────────────────────
  await server.register(postsRoutes, { prefix: '/api/posts' });
  await server.register(blocksRoutes, { prefix: '/api/blocks' });
  await server.register(mediaRoutes, { prefix: '/api/media' });
  await server.register(settingsRoutes, { prefix: '/api/settings' });
  await server.register(chatbotRoutes, { prefix: '/api/chatbot' });
  await server.register(worksRoutes, { prefix: '/api/works' });
  await server.register(authRoutes, { prefix: '/api/auth' });
  await server.register(karyaRoutes, { prefix: '/api/karya' });

  // ── Health check ───────────────────────────
  server.get('/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }));

  try {
    await server.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`✅ CMS Backend running on port ${PORT}`);

    ['SIGINT', 'SIGTERM'].forEach((signal) => {
      process.on(signal, async () => {
        console.log(`\nReceived ${signal}, closing server and database connection...`);
        try {
          await server.close();
          await prisma.$disconnect();
        } catch (e) {
          console.error(e);
        }
        process.exit(0);
      });
    });

  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

bootstrap();
