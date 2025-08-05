import { app } from "./app";

const port = Number(process.env.PORT) || 3000;

app.listen(port, '0.0.0.0').then((address) => {
  console.log(`Server listening on ${address}`);
}).catch((err) => {
  console.error(err);
  process.exit(1);
})