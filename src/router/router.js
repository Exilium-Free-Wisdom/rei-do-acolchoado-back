import { Router } from "express";
import { corsMiddleware } from "../config/cors.config";
import { logger } from "../../pkg/log/logger";
import { UserHandlers } from "../handlers/user.handlers";

export const NewRouter = (userHandlers) => {
    const router = Router();

    router.use(corsMiddleware())

    router.use(logger())
    
    // Public routers
    router.post("/login", (req, res) => userHandlers.login(req, res));
    router.post("/register", (req, res) => userHandlers.register(req, res));

    return router
}
