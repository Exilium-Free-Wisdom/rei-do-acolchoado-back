export interface LoginDTO {
	email: string;
	password: string;
}

export interface RegisterDTO {
	id?: number;
	email: string;
	name: string;
	password?: string;
}
