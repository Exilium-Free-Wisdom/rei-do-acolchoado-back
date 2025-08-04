export const corsMiddleware = (app) => {
    return ((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", process.env.ORIGIN_CORS || "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        next();
    })
}