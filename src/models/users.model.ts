import type { User } from 'src/interfaces/users.interfaces';
import { pool } from './connection';
import { Injectable } from '@nestjs/common';

Injectable();
export class UsersModel {
	async create(user: User): Promise<User> {
		const { rows } = await pool.query<User>(
			'INSERT INTO SYS_USR (SYS_ID, SYS_NAME, SYS_EMAIL, SYS_PHONE, SYS_PASSWORD, SYS_ROLE) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
			[
				user.id,
				user.name,
				user.email,
				user.phone,
				user.password,
				user.role,
			],
		);
		return rows[0];
	}

	async findAll(): Promise<User[]> {
		const { rows: users } = await pool.query<User>('SELECT * FROM SYS_USR');
		return users;
	}
}
