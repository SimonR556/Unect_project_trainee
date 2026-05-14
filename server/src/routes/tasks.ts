import { FastifyInstance } from 'fastify';
import { AppDataSource } from '../database';
import { Task } from '../entities/Task';
import { authenticate } from '../middlewares/authenticate';

export async function taskRoutes(app: FastifyInstance) {
    const taskRepository = AppDataSource.getRepository(Task);

    app.addHook('preHandler', authenticate);

    app.post('/tasks', async (request, reply) => {
        const { title, description } = request.body as { title: string, description: string };

        const userId = (request as any).user.id; 

        const newTask = taskRepository.create({
            title,
            description,
            user: { id: userId }
        });

        await taskRepository.save(newTask);
        return reply.status(201).send(newTask);
    });

    app.get('/tasks', async (request, reply) => {
        const userId = (request as any).user.id;

        const tasks = await taskRepository.find({
            where: { user: { id: userId } }
        });
        
        return reply.send(tasks);
    });

    app.put('/tasks/:id', async (request, reply) => {
        const { id } = request.params as { id: string };
        const { status } = request.body as { status: string };
        const userId = (request as any).user.id;

        const task = await taskRepository.findOne({ where: { id, user: { id: userId } } });

        if (!task) {
            return reply.status(404).send({ message: 'Tarefa não encontrada ou acesso negado' });
        }

        task.status = status;
        await taskRepository.save(task);
        return reply.send(task);
    });

    app.delete('/tasks/:id', async (request, reply) => {
        const { id } = request.params as { id: string };
        const userId = (request as any).user.id;

        const task = await taskRepository.findOne({ where: { id, user: { id: userId } } });

        if (!task) {
            return reply.status(404).send({ message: 'Tarefa não encontrada ou acesso negado' });
        }

        await taskRepository.remove(task);
        return reply.status(204).send();
    });
}