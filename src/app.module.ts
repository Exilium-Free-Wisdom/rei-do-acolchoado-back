import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ModelsModule } from './models/models.module';
import { ServicesModule } from './services/services.module';
import { ControllersModule } from './controllers/controllers.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: ['.env'],
		}),
		ModelsModule,
		ServicesModule,
		ControllersModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
