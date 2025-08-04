import { TIMEOUT_IN_MMS_BY_EVENTS } from "../constants/index.js"

export const load = async (socket) => {
    socket.ev.on('message.upsert', ({ messages }) => {
        setTimeout(() => {
            onMessagesUpsert({ socket, messages })
        }, TIMEOUT_IN_MMS_BY_EVENTS)
    })
}