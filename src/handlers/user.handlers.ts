import { UserService } from './../services/user.service';
import type { Request, Response } from 'express';

interface RegisterRequest {
    id: string;
    name: string;
    email: string;
    password: string;
    salt: string;
    hashedPassword: string;
    role: string;
}

interface LoginRequest {
    email: string;
    password: string;
}

export class UserHandlers {
    constructor(
        private UserService: UserService
    ) {
        this.UserService = UserService
    }

    async register(req: Request, res: Response) {
        const data = req.body as RegisterRequest

        const user = await this.UserService.register(data)

        return res.status(201).json(user)
    }

    async login(req: Request, res: Response) {
        const data = req.body as LoginRequest

        const [acessToken, refreshToken] = await this.UserService.login(data.email, data.password)

        return res.status(200).json({ acessToken, refreshToken })
    }
}