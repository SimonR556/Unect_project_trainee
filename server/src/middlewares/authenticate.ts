import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    try {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            return reply.status(401).send({ message: 'Token não fornecido. Acesso negado.' });
        }

        const [, token] = authHeader.split(' ');

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_senha_secreta_do_utask_3');

        (request as any).user = decoded;

    } catch (error) {
        return reply.status(401).send({ message: 'Token inválido ou expirado.' });
    }
}