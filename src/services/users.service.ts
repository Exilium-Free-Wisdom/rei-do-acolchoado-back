import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { User } from 'src/interfaces/users.interfaces';
import { UsersModel } from 'src/models/users.model';

@Injectable()
export class UsersService {
	constructor(readonly usersModel: UsersModel) {}
	private users: User[] = [];
	async create(user: Omit<User, 'id'>): Promise<User> {
		const newUser = {
			id: uuid(),
			...user,
		};
		const result = await this.usersModel.create(newUser);
		return result;
	}

	async findAll(): Promise<User[]> {
		const result = await this.usersModel.findAll();
		return result;
	}
}
