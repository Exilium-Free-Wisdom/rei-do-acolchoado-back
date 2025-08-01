import { Global, Module } from '@nestjs/common';
import { pool } from './connection';
import { UsersModel } from './users.model';

@Global()
@Module({
	providers: [
		{
			provide: 'DATABASE_POOL',
			useValue: pool,
		},
		UsersModel,
	],
	exports: ['DATABASE_POOL', UsersModel],
})
export class ModelsModule {}
