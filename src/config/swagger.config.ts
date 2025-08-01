import { RawServerDefault } from 'fastify';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
export function swaggerConfig(
	app: NestFastifyApplication<RawServerDefault>,
): void {
	const config = new DocumentBuilder()
		.setTitle('Rei do Acolchoado')
		.setDescription('The Rei do Acolchoado API description')
		.setVersion('1.0')
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document); // swagger vai aparecer na rota /docs
}
