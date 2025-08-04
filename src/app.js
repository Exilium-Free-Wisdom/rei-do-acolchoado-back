import express from "express";
import morgan from "morgan";
import { swaggerConfig } from "./config/swagger.config.js";
import SwaggerUI from "swagger-ui-express";
import { PostgresPool } from "./persistence/db/connection.js";

const app = express();

app.use(express.json());

app.use(morgan("combined"));

const db = new PostgresPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: false
});

const swaggerDocs = swaggerConfig();
app.use("/", SwaggerUI.serve, SwaggerUI.setup(swaggerDocs), await db.connection());

export default app;