import { connect } from "./connection";

const start = async () => {
    const socket = await connect();

    load(socket);
}

await start();