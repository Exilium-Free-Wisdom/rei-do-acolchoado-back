export const loadCommonFunctions = ({ socket, webMessage }) => {
    const sender = webMessage.key.remoteJid
    const message = webMessage.message

    const isText = !!(message?.conversation || message?.extendedTextMessage?.text)
    const isImage = !!message?.imageMessage

    const getMessageBody = () => {
        return message?.conversation || message?.extendedTextMessage?.text || ''
    }

    const getImageInfo = () => {
        if (!isImage) return null
        return {
            mimeType: message.imageMessage.mimetype,
            caption: message.imageMessage.caption || '',
            mediaKey: message.imageMessage.mediaKey,
            fileSha256: message.imageMessage.fileSha256,
            url: message.imageMessage.url,
        }
    }

    return {
        socket,
        webMessage,
        sender,
        isText,
        isImage,
        getMessageBody,
        getImageInfo,
        reply: async (text) => {
            await socket.sendMessage(sender, {
                text,
                quoted: webMessage
            })
        }
    }
}
