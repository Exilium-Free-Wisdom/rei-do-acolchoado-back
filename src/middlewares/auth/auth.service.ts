import * as jose from 'jose'
import * as bcrypt from 'bcrypt'

export interface Auth {
    hashPassword(password: string): Promise<string>
    verifyPassword(password: string, hashedPassword: string): Promise<boolean>
    generateToken(payload: object): Promise<string>
    refreshToken(payload: object): Promise<string>
}

export class AuthService {
    private secretKey: Buffer;

    constructor(secretKey: Buffer) {
        this.secretKey = secretKey;
    }

    async generateToken(payload: object): Promise<string> {
        return await new jose.SignJWT({ ...payload })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('1d')
            .sign(this.secretKey);
    }

    async refreshToken(payload: object): Promise<string> {
        return await new jose.SignJWT({ ...payload })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(this.secretKey);
    }

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt()

        const hashedPassword = await bcrypt.hash(password + salt, salt)

        if (!hashedPassword) {
            throw new Error('Failed to hash password')
        }
        
        return hashedPassword.toString()
    }

    async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword)
    }
}