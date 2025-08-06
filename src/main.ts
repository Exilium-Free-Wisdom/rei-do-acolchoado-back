import { app } from "./app";

const PORT = Number(process.env.PORT) || 3000;

app.listen({ port: PORT, host: '0.0.0.0' }).then((address) => {
  console.log(`Server listening on ${address}`);
}).catch((err) => {
  console.error(err);
  process.exit(1);
})