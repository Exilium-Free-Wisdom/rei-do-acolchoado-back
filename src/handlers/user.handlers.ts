import type { FastifyReply, FastifyRequest } from 'fastify';
import { UserService } from './../services/user.service';

export type RegisterRequest = {
    name: string;
    email: string;
    password: string;
}

export type LoginRequest = {
    email: string;
    password: string;
}

export class UserHandlers {
    constructor(
        private UserService: UserService
    ) {
        this.UserService = UserService
    }

    async register(req: FastifyRequest, res: FastifyReply) {
        try {
            const data = req.body as RegisterRequest

            const user = await this.UserService.register(data)

            return res.status(201).send({ ok: `Usuário cadastrado com sucesso ${user}` })

        } catch (error) {
            return res.status(400).send({ error: `Ocorreu algum problema na tentativa do cadastro ${error}` })
        }
    }

    async login(req: FastifyRequest, res: FastifyReply) {
        try {
            const data = req.body as LoginRequest

            const [acessToken, refreshToken] = await this.UserService.login(data.email, data.password)

            return res.status(200).send({ acessToken, refreshToken })

        } catch (error) {
            return res.status(400).send({ error: `Ocorreu algum problema na tentativa de login ${error}` })
        }
    }
}