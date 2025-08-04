import { loadCommonFunctions } from "../utils/loadCommonFunctions"
import { getSession } from "../utils/sessionManager"

export const onMessagesUpsert = async ({ socket, messages }) => {
    if (!messages.length) return
    
    const webMessage = messages[0]
    const { sender, isText, getMessageBody, reply } = loadCommonFunctions({ socket, webMessage })

    if (!isText) {
        await reply('Desculpe, apenas comandos de texto.')
        return
    }

    const session = getSession(sender)
    const message = getMessageBody().trim()

    // switch (session.etapa) {
    //     case 0:

    // }

    // await dynamicCommand(commmonFunctions)
}