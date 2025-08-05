import { randomBytes } from "crypto";
import type { User } from "../@types/user";
import type { Auth } from "../middlewares/auth/auth.service";
import type { UserRepository } from "../repositories/user.repository";
import { v4 as uuidv4 } from 'uuid'
import type { RegisterRequest } from "../handlers/user.handlers";

export class UserService {
    constructor(
        private userRepo: UserRepository,
        private auth: Auth
    ) {}

    async register(data: RegisterRequest): Promise<User> {
        const existingUser = await this.userRepo.checkEmailExists(data.email)

        if (existingUser) {
            throw new Error('Email já cadastrado')
        }

        const hashedPassword = await this.auth.hashPassword(data.password)

        if (!hashedPassword) {
            throw new Error('Failed to hash password')
        }

        const userRequest: User = {
            id: uuidv4(),
            name: data.name,
            email: data.email,
            salt: randomBytes(30).toString('hex'),
            hashedPassword,
            role: 'user'
        }

        const createdUser = await this.userRepo.create(userRequest)

        return createdUser
    }

    async login(email: string, password: string): Promise<[string, string]> {
        const user = await this.userRepo.getByEmail(email)

        if (!user) {
            throw new Error('Usuário não encontrado')
        }

        const isPasswordValid = await this.auth.verifyPassword(password, user.hashedPassword)

        if (!isPasswordValid) {
            throw new Error('Senha inválida')
        }

        const update = await this.userRepo.update(user)

        if (!update) {
            throw new Error('Failed to update user')
        }

        const acessToken = await this.auth.generateToken({
            id: uuidv4(),
            role: user.role
        })

        if (!acessToken) {
            throw new Error('Failed to generate access token')
        }

        const refreshToken = await this.auth.refreshToken({
            id: uuidv4()
        })

        if (!refreshToken) {
            throw new Error('Failed to generate refresh token')
        }

        return [acessToken, refreshToken]
    }
}