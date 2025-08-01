import { RolesEnum } from '../enum/roles.enum';

export class User {
	id: string;
	email: string;
	name: string;
	password: string;
	role: RolesEnum;
}
