import { Pool } from 'postgres-pool';

const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbPassword = process.env.DB_PASSWORD;
const dbPort = process.env.DB_PORT;

export const pool = new Pool({
	host: dbHost ?? '',
	user: dbUser,
	database: dbName ?? '',
	password: dbPassword,
	port: Number(dbPort),
});
