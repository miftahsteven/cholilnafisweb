import { z } from 'zod';

// ── POSTS ──────────────────────────────────────────────────────
export const CreatePostSchema = z.object({
  title: z.string().min(1).max(500),
  slug: z.string().min(1).max(500).regex(/^[a-z0-9-]+$/),
  content: z.string().min(1),
  excerpt: z.string().max(500).optional(),
  coverImage: z.string().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
  seoTitle: z.string().max(100).optional(),
  seoDesc: z.string().max(200).optional(),
  schemaJson: z.record(z.any()).optional(),
  categoryIds: z.array(z.string()).optional(),
  tagIds: z.array(z.string()).optional(),
});

export const UpdatePostSchema = CreatePostSchema.partial();

// ── BLOCKS ──────────────────────────────────────────────────────
export const CreateBlockSchema = z.object({
  pageId: z.string(),
  type: z.enum(['hero', 'about', 'gallery', 'opinions', 'chatbot', 'works', 'footer', 'news']),
  order: z.number().int().min(0),
  active: z.boolean().default(true),
  content: z.record(z.any()),
});

// ── SETTINGS ────────────────────────────────────────────────────
export const UpdateSettingSchema = z.object({
  value: z.record(z.any()),
});

// ── WORKS ───────────────────────────────────────────────────────
export const CreateWorkSchema = z.object({
  title: z.string().min(1),
  type: z.enum(['BUKU', 'JURNAL', 'ARTIKEL', 'KARYA_DIGITAL']),
  content: z.string().optional(),
  fileUrl: z.string().url().optional(),
  repoUrl: z.string().url().optional(),
  doi: z.string().optional(),
  publisher: z.string().optional(),
  year: z.number().int().optional(),
  references: z.string().optional(),
  published: z.boolean().default(false),
});

// ── CHATBOT ─────────────────────────────────────────────────────
export const ChatbotAskSchema = z.object({
  question: z.string()
    .min(3, 'Pertanyaan terlalu pendek')
    .max(500, 'Pertanyaan terlalu panjang'),
  sessionId: z.string().optional(),
});

// ── MEDIA ───────────────────────────────────────────────────────
export const UpdateMediaSchema = z.object({
  alt: z.string().max(200).optional(),
});

// ── KARYA ───────────────────────────────────────────────────────
export const CreateKaryaSchema = z.object({
  category: z.enum(['ArtikelKoran', 'KaryaBuku', 'Khotbah', 'Artikel', 'Materi']),
  sumber: z.string().optional().default('cholilnafis.id'),
  title: z.string().min(1),
  shortcontent: z.string().optional(),
  fullcontent: z.string().min(1),
  fileUrl: z.string().url().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
});

export const UpdateKaryaSchema = CreateKaryaSchema.partial();

