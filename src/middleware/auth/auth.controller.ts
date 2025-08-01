import { Body, Controller, Post } from '@nestjs/common';
import type { LoginDTO, RegisterDTO } from './dtos/auth';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
	@Post('login')
	async login(@Body() login: LoginDTO) {
		const result = await this.authService.login(login);
		return login;
	}

	@Post('register')
	async register(@Body() register: RegisterDTO) {
		console.log({ register });
		return register;
	}
}
