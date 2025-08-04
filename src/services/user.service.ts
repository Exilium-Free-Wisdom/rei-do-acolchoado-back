import type { User } from "../@types/user";
import type { Auth } from "../middlewares/auth/auth.service";
import type { UserRepository } from "../repositories/user.repository";
import { v4 as uuidv4 } from 'uuid'

export class UserService {
    constructor(
        private userRepo: UserRepository,
        private auth: Auth
    ) {}

    async register(user: User): Promise<User> {
        const emailExists = await this.userRepo.checkEmailExists(user.email)

        if (emailExists) {
            throw new Error('Email já cadastrado')
        }

        const hashedPassword = await this.auth.hashPassword(user.password)

        if (!hashedPassword) {
            throw new Error('Failed to hash password')
        }

        const createdUser = await this.userRepo.create({
            ...user,
            password: hashedPassword
        })

        return createdUser
    }

    async login(email: string, password: string): Promise<[string, string]> {
        const user = await this.userRepo.getByEmail(email)

        if (!user) {
            throw new Error('Usuário não encontrado')
        }

        const isPasswordValid = await this.auth.verifyPassword(password, user.hashedPassword, user.salt)

        if (!isPasswordValid) {
            throw new Error('Senha inválida')
        }

        const update = this.userRepo.update(user)

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