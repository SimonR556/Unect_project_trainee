import { FastifyInstance } from 'fastify';
import { AppDataSource } from '../database';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function authRoutes(app: FastifyInstance) {
    const userRepository = AppDataSource.getRepository(User);

    app.post('/register', async (request, reply) => {
        const { name, email, password } = request.body as any;

        const userExists = await userRepository.findOne({ where: { email } });
        if (userExists) {
            return reply.status(400).send({ message: 'E-mail já cadastrado!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = userRepository.create({
            name,
            email,
            password: hashedPassword 
        });

        await userRepository.save(newUser);

        return reply.status(201).send({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        });
    });

    app.post('/login', async (request, reply) => {
        const { email, password } = request.body as any;

        const user = await userRepository.findOne({ where: { email } });
        if (!user) {
            return reply.status(401).send({ message: 'E-mail ou senha incorretos' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return reply.status(401).send({ message: 'E-mail ou senha incorretos' });
        }

        const token = jwt.sign(
            { id: user.id }, 
            process.env.JWT_SECRET || 'chave_de_emergencia', 
            { expiresIn: '1d' }
        );

        return reply.send({
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token
        });
    });
}