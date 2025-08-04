import QRCode from "qrcode"
import { QRCode as QRCodeType } from "../@types/qrcode"

export const generateQRCode = async (): Promise<string> => {
    const value = '10'
    const qr: QRCodeType = {
        key: process.env.QR_KEY!,
        value: value,
        payload: process.env.QR_PAYLOAD!,
    }

    return await QRCode.toDataURL(qr.payload)
}