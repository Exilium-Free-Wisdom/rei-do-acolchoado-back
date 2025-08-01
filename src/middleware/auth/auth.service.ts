import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDTO } from './dtos/auth';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(private prismaService: PrismaService) {}
	//async login(data: LoginDTO): Promise<LoginDTO> {}

	async register(data: RegisterDTO): Promise<RegisterDTO> {
		const userAlreadyExists = await this.prismaService.user.findUnique({
			where: {
				email: data.email,
			},
		});

		if (userAlreadyExists) {
			throw new UnauthorizedException('User already exists');
		}
		const hashedPassword = await bcrypt.hash(data.password as string, 10);

		const user = await this.prismaService.user.create({
			data: {
				...data,
				password: hashedPassword,
			},
		});

		return {
			email: user.email,
			name: user.name,
		};
	}
}
