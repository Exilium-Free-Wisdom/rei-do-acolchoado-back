import { Module } from '@nestjs/common';
import { ModelsModule } from 'src/models/models.module';
import { UsersService } from 'src/services/users.service';
import { UsersController } from './users.controller';

@Module({
	imports: [ModelsModule],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
})
export class ControllersModule {}
