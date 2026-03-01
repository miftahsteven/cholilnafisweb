"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const helmet_1 = __importDefault(require("@fastify/helmet"));
const rate_limit_1 = __importDefault(require("@fastify/rate-limit"));
const multipart_1 = __importDefault(require("@fastify/multipart"));
const static_1 = __importDefault(require("@fastify/static"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const posts_route_1 = require("./routes/posts.route");
const blocks_route_1 = require("./routes/blocks.route");
const media_route_1 = require("./routes/media.route");
const settings_route_1 = require("./routes/settings.route");
const chatbot_route_1 = require("./routes/chatbot.route");
const works_route_1 = require("./routes/works.route");
const auth_route_1 = require("./routes/auth.route");
const server = (0, fastify_1.default)({ logger: true });
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(',');
const PORT = Number(process.env.PORT) || 4000;
async function bootstrap() {
    // ── Security ──────────────────────────────
    await server.register(helmet_1.default, { global: true });
    await server.register(cors_1.default, {
        origin: (origin, cb) => {
            if (!origin || ALLOWED_ORIGINS.includes(origin)) {
                cb(null, true);
            }
            else {
                cb(new Error('Forbidden by CORS'), false);
            }
        },
        credentials: true,
    });
    await server.register(rate_limit_1.default, {
        max: 100,
        timeWindow: '1 minute',
    });
    // ── File upload support ────────────────────
    await server.register(multipart_1.default, {
        limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    });
    // Serve static uploads
    const uploadsDir = path_1.default.join(__dirname, '..', 'public', 'uploads');
    if (!fs_1.default.existsSync(uploadsDir)) {
        fs_1.default.mkdirSync(uploadsDir, { recursive: true });
    }
    await server.register(static_1.default, {
        root: uploadsDir,
        prefix: '/uploads/',
    });
    // ── Routes ────────────────────────────────
    await server.register(posts_route_1.postsRoutes, { prefix: '/api/posts' });
    await server.register(blocks_route_1.blocksRoutes, { prefix: '/api/blocks' });
    await server.register(media_route_1.mediaRoutes, { prefix: '/api/media' });
    await server.register(settings_route_1.settingsRoutes, { prefix: '/api/settings' });
    await server.register(chatbot_route_1.chatbotRoutes, { prefix: '/api/chatbot' });
    await server.register(works_route_1.worksRoutes, { prefix: '/api/works' });
    await server.register(auth_route_1.authRoutes, { prefix: '/api/auth' });
    // ── Health check ───────────────────────────
    server.get('/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }));
    try {
        await server.listen({ port: PORT, host: '0.0.0.0' });
        console.log(`✅ CMS Backend running on port ${PORT}`);
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}
bootstrap();
