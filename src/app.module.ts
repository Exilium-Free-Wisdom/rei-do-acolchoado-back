import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ControllerModule } from './controller/controller.module';
import { MiddlewareModule } from './middleware/middleware.module';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['.env', '.dev.env'],
		}),
		ControllerModule,
		MiddlewareModule,
	],
	controllers: [AppController],
	providers: [PrismaService],
})
export class AppModule {}
