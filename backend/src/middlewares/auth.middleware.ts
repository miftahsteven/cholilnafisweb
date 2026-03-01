import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';

export interface AuthPayload {
  sub: string;
  email: string;
  role: string;
}

// Evaluate at runtime to avoid import hoisting issues with dotenv
const getJwtSecret = () => process.env.JWT_SECRET || 'changeme_in_production';

export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authHeader = request.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.error("Auth header missing or invalid:", request.headers);
    return reply.status(401).send({ error: 'Unauthorized: Missing token' });
  }

  const token = authHeader.slice(7);
  try {
    const payload = jwt.verify(token, getJwtSecret()) as AuthPayload;
    (request as any).user = payload;
  } catch (err: any) {
    console.error("JWT Verification failed:", err.message);
    return reply.status(401).send({ error: 'Unauthorized: Invalid or expired token' });
  }
}

export function requireRole(...roles: string[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const user = (request as any).user as AuthPayload | undefined;
    if (!user || !roles.includes(user.role)) {
      return reply.status(403).send({ error: 'Forbidden: Insufficient permissions' });
    }
  };
}
