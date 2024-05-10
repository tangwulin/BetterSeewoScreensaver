import { Background } from './type/background.ts'
import { Payload } from './type/payload.ts'

declare global {
    interface Window {
        urlParams: any;
        windowName: string;
        ipcRenderer: {
            send(channel: string, ...args: any[]): void;
        }
        webFrame: {
            setZoomFactor(factor: number): void;
            setZoomLevel(level: number): void;
        }
        electronRemote: {
            getCurrentWindow(): {
                setAlwaysOnTop(flag: boolean): void;
                close(): void;
            }
        }
        _ACCEPT_DATA: {
            data: {
                screensaverMessage: Payload
                // screensaverMessage: {
                //     'imageList': string[],
                //     'materialSource': string,
                //     'extraPayload': { backgroundList: Background[] },
                //     'pictureSizeType': 0 | 1,// 0:contain, 1:cover
                //     // contain:	保持原有尺寸比例。长度和高度中短的那条边跟容器大小一致，长的那条等比缩放，可能会有留白。
                //     // cover:	保持原有尺寸比例。宽度和高度中长的那条边跟容器大小一致，短的那条等比缩放。可能会有部分区域不可见。
                //     'playMode': 0, //这个实际上没有用到
                //     'switchInterval': number, //切换间隔
                //     'textList': { content: string, provenance: string }[] //不知道怎么用
                // }
            }
        }
    }
}