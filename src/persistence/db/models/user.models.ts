import type { Pool, QueryResult } from "pg";
import type { User } from "../../../@types/user";

export class UserModel {
    constructor(
        private pool: Pool
    ) {}

    async create(user: User): Promise<User> {
        const query = await this.pool.query(
            `INSERT INTO SYS_USR (SYS_ID, SYS_NAME, SYS_EMAIL, SYS_PASSWORD, SYS_ROLE, SYS_SALT) VALUES ($1, $2, $3, $4, $5, $6)`,
            [user.id, user.name, user.email, user.hashedPassword, user.role, user.salt]
        )
        return query.rows[0] as User
    }

    async update(user: User): Promise<User> {
        const query = await this.pool.query(
            `UPDATE SYS_USER SET SYS_NAME = $1, SYS_EMAIL = $2, SYS_PASSWORD = $3, SYS_ROLE = $4, SYS_SALT = $5 WHERE SYS_ID = $6`,
            [user.name, user.email, user.hashedPassword, user.role, user.salt, user.id]
        )
        return query.rows[0] as User
    }

    async checkEmailExists(email: string): Promise<User | null> {
        const query = await this.pool.query(
            `SELECT SYS_ID as id, SYS_NAME as name, SYS_EMAIL as email, SYS_PASSWORD as hashedPassword, SYS_ROLE as role, SYS_SALT as salt FROM SYS_USR WHERE SYS_EMAIL = $1`,
            [email]
        )
        
        return query.rows.length > 0 ? query.rows[0] as User : null;
    }

    async getByEmail(email: string): Promise<User> {
        const query = await this.pool.query(
            `SELECT SYS_NAME, SYS_EMAIL, SYS_PASSWORD, SYS_ROLE FROM SYS_USR WHERE SYS_EMAIL = $1`,
            [email]
        )

        return query.rows[0] as User
    }
}

