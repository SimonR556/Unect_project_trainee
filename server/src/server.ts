import 'reflect-metadata';
import fastify from 'fastify';
import cors from '@fastify/cors';
import { taskRoutes } from './routes/tasks';
import { authRoutes } from './routes/auth';
import { AppDataSource } from './database';


const app = fastify({ logger: true });

app.register(cors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization']
});

app.register(taskRoutes);
app.register(authRoutes);

app.get('/ping', async (request, reply) => {
    return { message: 'servidor uTask 3.0 online!' };
});

const start = async () => {
    try {
        await AppDataSource.initialize();
        console.log('banco de dados conectado');

        await app.listen({ port: Number(process.env.PORT) || 3333 });
        console.log(`servidor rodando em http://localhost:${process.env.PORT || 3333}`);
        
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();