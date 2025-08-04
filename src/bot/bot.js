import { connect } from "./connection.js";

const start = async () => {
    const socket = await connect()

    load(socket);
}

await start();