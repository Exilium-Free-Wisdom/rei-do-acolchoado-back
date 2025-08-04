import express from "express";
import morgan from "morgan";
import { swaggerConfig } from "./config/swagger.config.js";
import SwaggerUI from "swagger-ui-express";
import { PostgresPool } from "./persistence/db/connection.ts";
import { NewRouter } from "./router/router.js";
import { AuthService } from "./middlewares/auth/auth.service.js";
import { UserHandlers } from "./handlers/user.handlers.js";
import { UserService } from "./services/user.service.js";
import { UserModel } from "./persistence/db/models/user.models.js";

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

await db.connection();

const userRepository = new UserModel(db.pool);
const authService = new AuthService(process.env.JWT_SECRET);
const userService = new UserService(userRepository, authService);
const userHandlers = new UserHandlers(userService);

app.use(NewRouter(userHandlers));

const swaggerDocs = swaggerConfig();
app.use("/", SwaggerUI.serve, SwaggerUI.setup(swaggerDocs));

export default app;