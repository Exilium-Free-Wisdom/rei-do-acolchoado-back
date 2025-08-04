import { UserService } from './../services/user.service';
import type { Request, Response } from 'express';

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface LoginRequest {
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
        try {
            const data = req.body as RegisterRequest

            const user = await this.UserService.register(data)

            return res.status(201).json({ ok: "Usuário cadastrado com sucesso", user })

        } catch (error) {
            return res.status(400).json({ error: `Ocorreu algum problema na tentativa do cadastro ${error}` })
        }
    }

    async login(req: Request, res: Response) {
        try {
            const data = req.body as LoginRequest

            const [acessToken, refreshToken] = await this.UserService.login(data.email, data.password)

            return res.status(200).json({ acessToken, refreshToken })

        } catch (error) {
            return res.status(400).json({ error: `Ocorreu algum problema na tentativa de login ${error}` })
        }
    }
}