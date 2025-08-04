import type { Pool, Query, QueryResult } from "pg";
import type { User } from "../../../@types/user";

export class UserModel {
    constructor(
        private user: User,
        private pool: Pool
    ) {}

    async create(): Promise<QueryResult> {
        const query = await this.pool.query(
            `INSERT INTO SYS_USR (SYS_ID, SYS_NAME, SYS_EMAIL, SYS_PASSWORD, SYS_ROLE) VALUES ($1, $2, $3, $4, $5)`,
            [this.user.id, this.user.name, this.user.email, this.user.password, this.user.role]
        )
        return query
    }

    async update(): Promise<QueryResult> {
        const query = await this.pool.query(
            `UPDATE SYS_USER SET SYS_NAME = $1, SYS_EMAIL = $2, SYS_PASSWORD = $3, SYS_ROLE = $4 WHERE SYS_ID = $5`,
            [this.user.name, this.user.email, this.user.password, this.user.role, this.user.id]
        )
        return query
    }

    async checkEmailExists(): Promise<boolean> {
        const query = await this.pool.query(
            `SELECT * FROM SYS_USR WHERE SYS_EMAIL = $1 IS NOT NULL`,
            [this.user.email]
        )
        
        if (query.rowCount) {
            return true;
        }

        return false;
    }

    async getByEmail(email: string): Promise<QueryResult> {
        const query = await this.pool.query(
            `SELECT SYS_NAME, SYS_EMAIL, SYS_PASSWORD, SYS_ROLE FROM SYS_USR WHERE SYS_EMAIL = $1`,
            [email]
        )

        return query
    }
}
