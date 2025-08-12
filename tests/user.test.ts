import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import request from 'supertest';
import { fastify, type FastifyReply, type FastifyRequest } from 'fastify';
import { UserService } from '../src/services/user.service';
import { UserHandlers } from '../src/handlers/user.handlers';

describe('userHandler', () => {
	let app: ReturnType<typeof fastify>;
	let userServiceMock: Partial<UserService>;
	let userHandlers: UserHandlers;

	beforeAll(async () => {
		app = fastify();

		userServiceMock = {
			register: vi.fn(),
			login: vi.fn(),
		};

		userHandlers = new UserHandlers(userServiceMock as UserService);

		app.post('/register', userHandlers.register.bind(userHandlers));
		app.post('/login', userHandlers.login.bind(userHandlers));

		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('register user', async () => {
		const fakeUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
		(userServiceMock.register as any).mockResolvedValue(fakeUser);

		const res = await request(app.server).post('/register').send({
			name: 'John Doe',
			email: 'john@example.com',
			password: '123456',
		});

		expect(res.status).toBe(201);
		expect(res.body).toHaveProperty('ok');
	});

	it('register fail', async () => {
		(userServiceMock.register as any).mockRejectedValue(
			new Error('Erro no cadastro'),
		);

		const res = await request(app.server).post('/register').send({
			name: 'John Doe',
			email: 'john@example.com',
			password: '123456',
		});

		expect(res.status).toBe(400);
		expect(res.body).toHaveProperty('error');
	});
});
