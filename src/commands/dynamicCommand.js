export const dynamicCommand = async ({ isText, isImage, getMessageBody, getImageInfo, reply }) => {
    if (isText) {
        const text = getMessageBody()
        console.info('Texto recebido:', text)
        await reply('Recebi seu texto!')
    } else if (isImage) {
        const imageInfo = getImageInfo()
        console.info('Imagem recebida:', imageInfo)
        await reply('Recebi sua imagem!')
    } else {
        await reply('Desculpe, só posso receber mensagens de texto ou imagem.')
    }
}
