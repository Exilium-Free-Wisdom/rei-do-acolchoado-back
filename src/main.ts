import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfig } from './config/swagger.config';
import { corsConfig } from './config/cors.config';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule);

	corsConfig(app);

	swaggerConfig(app);

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
