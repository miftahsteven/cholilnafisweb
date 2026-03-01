"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMediaSchema = exports.ChatbotAskSchema = exports.CreateWorkSchema = exports.UpdateSettingSchema = exports.CreateBlockSchema = exports.UpdatePostSchema = exports.CreatePostSchema = void 0;
const zod_1 = require("zod");
// ── POSTS ──────────────────────────────────────────────────────
exports.CreatePostSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(500),
    slug: zod_1.z.string().min(1).max(500).regex(/^[a-z0-9-]+$/),
    content: zod_1.z.string().min(1),
    excerpt: zod_1.z.string().max(500).optional(),
    coverImage: zod_1.z.string().optional(),
    status: zod_1.z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
    seoTitle: zod_1.z.string().max(100).optional(),
    seoDesc: zod_1.z.string().max(200).optional(),
    schemaJson: zod_1.z.record(zod_1.z.any()).optional(),
    categoryIds: zod_1.z.array(zod_1.z.string()).optional(),
    tagIds: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.UpdatePostSchema = exports.CreatePostSchema.partial();
// ── BLOCKS ──────────────────────────────────────────────────────
exports.CreateBlockSchema = zod_1.z.object({
    pageId: zod_1.z.string(),
    type: zod_1.z.enum(['hero', 'about', 'gallery', 'opinions', 'chatbot', 'works', 'footer', 'news']),
    order: zod_1.z.number().int().min(0),
    active: zod_1.z.boolean().default(true),
    content: zod_1.z.record(zod_1.z.any()),
});
// ── SETTINGS ────────────────────────────────────────────────────
exports.UpdateSettingSchema = zod_1.z.object({
    value: zod_1.z.record(zod_1.z.any()),
});
// ── WORKS ───────────────────────────────────────────────────────
exports.CreateWorkSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    type: zod_1.z.enum(['BUKU', 'JURNAL', 'ARTIKEL', 'KARYA_DIGITAL']),
    content: zod_1.z.string().optional(),
    fileUrl: zod_1.z.string().url().optional(),
    repoUrl: zod_1.z.string().url().optional(),
    doi: zod_1.z.string().optional(),
    publisher: zod_1.z.string().optional(),
    year: zod_1.z.number().int().optional(),
    references: zod_1.z.string().optional(),
    published: zod_1.z.boolean().default(false),
});
// ── CHATBOT ─────────────────────────────────────────────────────
exports.ChatbotAskSchema = zod_1.z.object({
    question: zod_1.z.string()
        .min(3, 'Pertanyaan terlalu pendek')
        .max(500, 'Pertanyaan terlalu panjang'),
    sessionId: zod_1.z.string().optional(),
});
// ── MEDIA ───────────────────────────────────────────────────────
exports.UpdateMediaSchema = zod_1.z.object({
    alt: zod_1.z.string().max(200).optional(),
});
