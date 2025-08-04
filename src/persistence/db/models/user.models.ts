import type { Pool, QueryResult } from "pg";
import type { User } from "../../../@types/user";

export class UserModel {
    constructor(
        private pool: Pool
    ) {}

    async create(user: User): Promise<QueryResult> {
        const query = await this.pool.query(
            `INSERT INTO SYS_USR (SYS_ID, SYS_NAME, SYS_EMAIL, SYS_PASSWORD, SYS_ROLE, SYS_SALT) VALUES ($1, $2, $3, $4, $5, $6)`,
            [user.id, user.name, user.email, user.hashedPassword, user.role, user.salt]
        )
        return query
    }

    async update(user: User): Promise<QueryResult> {
        const query = await this.pool.query(
            `UPDATE SYS_USER SET SYS_NAME = $1, SYS_EMAIL = $2, SYS_HASHEDPASSWORD = $3, SYS_ROLE = $4, SYS_SALT = $5 WHERE SYS_ID = $6`,
            [user.name, user.email, user.hashedPassword, user.role, user.salt, user.id]
        )
        return query
    }

    async checkEmailExists(email: string): Promise<User | null> {
        const query = await this.pool.query(
            `SELECT * FROM SYS_USR WHERE SYS_EMAIL = $1 IS NOT NULL`,
            [email]
        )

        if (query.rowCount == 0) return null;
        
        return query.rows[0];
    }

    async getByEmail(email: string): Promise<User> {
        const query = await this.pool.query(
            `SELECT SYS_NAME, SYS_EMAIL, SYS_HASHEDPASSWORD, SYS_ROLE FROM SYS_USR WHERE SYS_EMAIL = $1`,
            [email]
        )

        const row = query.rows[0];

        return {
            id: row.SYS_ID,
            name: row.SYS_NAME,
            email: row.SYS_EMAIL,
            hashedPassword: row.SYS_HASHEDPASSWORD,
            role: row.SYS_ROLE,
            salt: row.SYS_SALT
        };
    }
}
