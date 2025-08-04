import { Router } from "express";
import { corsMiddleware } from "../config/cors.config";
import { UserHandlers } from "../handlers/user.handlers";
import { logger } from "../pkg/log/logger";

export const NewRouter = (userHandlers: UserHandlers) => {
    const router = Router();

    router.use(corsMiddleware())

    router.use(logger())
    
    // Public routers
    router.post("/login", (req, res) => userHandlers.login(req, res));
    router.post("/register", (req, res) => userHandlers.register(req, res));

    return router
}
