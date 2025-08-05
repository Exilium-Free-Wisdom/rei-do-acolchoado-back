import { PostgresPool } from "./persistence/db/connection.js";
import { NewRouter } from "./router/router.js";
import { AuthService } from "./middlewares/auth/auth.service.js";
import { UserHandlers } from "./handlers/user.handlers.js";
import { UserService } from "./services/user.service.js";
import { UserModel } from "./persistence/db/models/user.models.js";
import fastify from "fastify";
import fastifyExpress from '@fastify/express';
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";


export const app = fastify({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname,req,res,err',
        messageFormat: '[${req.method}] ${req.url} - ${res.statusCode}',
      },
    },
  },
});

await app.register(fastifyExpress);

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

await app.register(fastifySwagger, {
    openapi: {
        info: {
            title: "Rei do Acolchoado API",
            version: "1.0.0"
        }
    }
});

await app.register(fastifyCors, { origin: process.env.ORIGIN_CORS || '*' });

await app.register(fastifySwaggerUi, {
    routePrefix: "/", 
});

const db = new PostgresPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    database: process.env.DB_NAME || 'postgres',
    password: process.env.DB_PASSWORD || '',
    port: Number(process.env.DB_PORT) || 5432,
    ssl: false
});

await db.connection();

const userRepository = new UserModel(db.getPool());
const jwtSecret = process.env.JWT_SECRET || 'default-secret';
const authService = new AuthService(Buffer.from(jwtSecret, 'utf8'));
const userService = new UserService(userRepository, authService);
const userHandlers = new UserHandlers(userService);

app.register((app) => NewRouter(app, userHandlers))