import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserHandlers } from "../handlers/user.handlers";

export const NewRouter = (app: FastifyInstance, userHandlers: UserHandlers) => {
    const router = app
    
    // Public routers
    router.post("/login", async (req: FastifyRequest, res: FastifyReply) => {
        return userHandlers.login(req, res)
    });
    router.post("/register", async (req: FastifyRequest, res: FastifyReply) => {
        return userHandlers.register(req, res)
    });

    return router
}
