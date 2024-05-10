import { Background } from './background.ts'

export interface Payload {
    imageList: string[]
    materialSource: string
    extraPayload?: ExtraPayload
    pictureSizeType: 0 | 1
    playMode: 0
    switchInterval: number
    textList: { content: string, provenance: string }[]
}

export interface ExtraPayload {
    screensaverSwitchInterval: number
    screensaverContent: Background[]
}
