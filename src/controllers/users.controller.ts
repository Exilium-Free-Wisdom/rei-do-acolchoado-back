import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import type { User } from 'src/interfaces/users.interfaces';
import { UsersService } from 'src/services/users.service';

@Controller('users')
export class UsersController {
	constructor(readonly usersService: UsersService) {}

	@Post()
	async create(@Body() user: User): Promise<User> {
		try {
			const create = await this.usersService.create(user);
			return create;
		} catch (error: any) {
			throw new HttpException(error as string, 400);
		}
	}

	@Get()
	async findAll(): Promise<User[]> {
		try {
			const user = await this.usersService.findAll();
			return user;
		} catch (error: any) {
			throw new HttpException(error as string, 400);
		}
	}
}
