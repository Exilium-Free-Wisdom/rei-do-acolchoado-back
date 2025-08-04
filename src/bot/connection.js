import makeWASocket, { DisconnectReason, fetchLatestBaileysVersion, useMultiFileAuthState } from 'baileys';
import path from 'path';
import pino from 'pino';
import { convertNumber, question } from '../utils/utils.js';

export const connect = async () => {
    const {state, saveCreds} = await useMultiFileAuthState(
        path.resolve(__dirname, '..', 'assets', 'auth', 'baileys')
    )

    const {version} = await fetchLatestBaileysVersion()


    const socket = makeWASocket({
        printQRInTerminal: false,
        version,
        logger: pino({level: 'info'}),
        auth: state,
        browser: ['Chrome (linux)', "", ""],
        markOnlineOnConnect: true,
    })

    if (!socket.authState.creds.registered) {
        const phoneNum = await question("Insira o numero de telefone: ")

        if (!phoneNum) {
            throw new Error('Phone number not provided');
        }

        const code = await socket.requestPairingCode(convertNumber(phoneNum))

        console.info(`Pairing code: ${code}`)
    }


    socket.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === 'close') {
            const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;

            if (shouldReconnect) {
                this.connect()
            }
        }
    })

    socket.ev.on('creds.update', saveCreds)
};