import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config = new DocumentBuilder()
		.setTitle('Rei do Acolchoado')
		.setDescription('The Rei do Acolchoado API description')
		.setVersion('1.0')
		.addBearerAuth()
		.build();

	app.enableCors({
		origin: process.env.ALLOWED_ORIGINS,
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		credentials: true,
	});

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document); // swagger vai aparecer na rota /docs
	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
