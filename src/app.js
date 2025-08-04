import express from "express";
import morgan from "morgan";
import { swaggerConfig } from "./config/swagger.config.js";
import SwaggerUI from "swagger-ui-express";

const app = express();

app.use(express.json());

app.use(morgan("combined"));

const swaggerDocs = swaggerConfig();
app.use("/", SwaggerUI.serve, SwaggerUI.setup(swaggerDocs));

export default app;