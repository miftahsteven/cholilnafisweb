"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
exports.requireRole = requireRole;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Evaluate at runtime to avoid import hoisting issues with dotenv
const getJwtSecret = () => process.env.JWT_SECRET || 'changeme_in_production';
async function authMiddleware(request, reply) {
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.error("Auth header missing or invalid:", request.headers);
        return reply.status(401).send({ error: 'Unauthorized: Missing token' });
    }
    const token = authHeader.slice(7);
    try {
        const payload = jsonwebtoken_1.default.verify(token, getJwtSecret());
        request.user = payload;
    }
    catch (err) {
        console.error("JWT Verification failed:", err.message);
        return reply.status(401).send({ error: 'Unauthorized: Invalid or expired token' });
    }
}
function requireRole(...roles) {
    return async (request, reply) => {
        const user = request.user;
        if (!user || !roles.includes(user.role)) {
            return reply.status(403).send({ error: 'Forbidden: Insufficient permissions' });
        }
    };
}
