import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserHandlers } from "../handlers/user.handlers";
import { loginSchema, registerSchema } from "./schemas/user.schemas";

export const NewRouter = (app: FastifyInstance, userHandlers: UserHandlers) => {
    const router = app
    
    // Public routers
    router.post("/login",
        { schema:  loginSchema },
        async (req: FastifyRequest, res: FastifyReply) => {
            return userHandlers.login(req, res)
        }
    );
    router.post("/register", 
        { schema: registerSchema },
        async (req: FastifyRequest, res: FastifyReply) => {
            return userHandlers.register(req, res)
        }
    );

    return router
}
