"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = authRoutes;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../lib/prisma");
// Evaluate at runtime to avoid import hoisting issues with dotenv
const getJwtSecret = () => process.env.JWT_SECRET || 'changeme_in_production';
const JWT_EXPIRES_IN = '8h';
async function authRoutes(fastify) {
    /**
     * POST /api/auth/login
     * Body: { username: string; password: string }
     * Returns: { token: string; user: { id, name, username, role } }
     */
    fastify.post('/login', {
        schema: {
            body: {
                type: 'object',
                required: ['username', 'password'],
                properties: {
                    username: { type: 'string', minLength: 1 },
                    password: { type: 'string', minLength: 1 },
                },
            },
        },
    }, async (request, reply) => {
        const { username, password } = request.body;
        // Find user by username
        const user = await prisma_1.prisma.user.findUnique({
            where: { username },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                role: true,
                passwordHash: true,
            },
        });
        console.log("User", user);
        if (!user || !user.passwordHash) {
            return reply.status(401).send({ error: 'Kredensial tidak valid' });
        }
        // Verify password
        const isValid = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!isValid) {
            return reply.status(401).send({ error: 'Kredensial tidak valid' });
        }
        // Sign JWT
        const token = jsonwebtoken_1.default.sign({
            sub: user.id,
            email: user.email,
            role: user.role,
            username: user.username,
        }, getJwtSecret(), { expiresIn: JWT_EXPIRES_IN });
        return reply.send({
            token,
            user: {
                id: user.id,
                name: user.name,
                username: user.username,
                role: user.role,
            },
        });
    });
}
