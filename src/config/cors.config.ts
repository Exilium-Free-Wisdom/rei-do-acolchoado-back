import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { RawServerDefault } from 'fastify';

export function corsConfig(
	app: NestFastifyApplication<RawServerDefault>,
): void {
	const host: string[] = [
		'http://localhost:3000',
		process.env.ALLOWED_ORIGINS ?? '',
	];

	app.enableCors({
		origin: host,
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		credentials: true,
	});
}
