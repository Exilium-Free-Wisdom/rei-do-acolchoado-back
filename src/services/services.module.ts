import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersModel } from 'src/models/users.model';

@Module({
	imports: [UsersModel],
	providers: [UsersService],
	exports: [UsersService],
})
export class ServicesModule {}
