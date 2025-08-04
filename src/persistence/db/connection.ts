import { Pool } from "pg";

export interface PostgresConfig {
    host: string;
    user: string;
    database: string;
    password: string;
    port: number;
    ssl: boolean;
}

export class PostgresPool {
    private pool: Pool;

    constructor(config: PostgresConfig) {
        this.pool = new Pool({
            host: config.host,
            user: config.user,
            database: config.database,
            password: config.password,
            port: config.port,
            ssl: config.ssl
        })
    }

    async connection(): Promise<void> {
        await this.pool.connect()
        console.info('Conectado ao banco de dados')
    }

    async desconnection(): Promise<void> {
        await this.pool.end()
        console.info('Desconectado do banco de dados')
    }

    getPool(): Pool {
        return this.pool
    }

}