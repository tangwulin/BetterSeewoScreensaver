import { Payload } from './type/payload.ts'

// import { spine } from './lib/spine-player'

export function getData(): Payload {
    if (import.meta.env.PROD) {
        return window._ACCEPT_DATA.data.screensaverMessage
    }
    return {
        imageList: [
            './85499466.jpg',
            './532421.jpg',
            './650142.jpg',
            './124177.jpg',
            './1325365.jpg',
        ],
        materialSource: '屏保功能来源于SeewoMitM',
        extraPayload: {
            screensaverSwitchInterval: 5000,
            screensaverContent: [
                // {
                //     type: 'image',
                //     path: './85499466.jpg',
                //     fit: 'cover',
                //     duration: 2000,
                // },
                // {
                //     type: 'image',
                //     path: './532421.jpg',
                //     fit: 'cover',
                //     duration: 2000,
                // },
                // {
                //     type: 'image',
                //     path: './650142.jpg',
                //     fit: 'cover',
                //     duration: 0,
                // },
                // {
                //     type: 'image',
                //     path: './124177.jpg',
                //     fit: 'cover',
                //     duration: 2000,
                // },
                // {
                //     type: 'image',
                //     path: './1325365.jpg',
                //     fit: 'cover',
                //     duration: 2000,
                // },
                // {
                //     type: 'video',
                //     path: './神里龟龟1080P.mp4',
                //     fit: 'cover',
                //     duration: 5000,
                // },
                {
                    type: 'spine',
                    spinePlayerConfig: {
                        skelUrl: './dyn_illust_char_1028_texas2.skel',
                        atlasUrl: './dyn_illust_char_1028_texas2.atlas',
                        viewport: {
                            width: 2048,
                            height: 2048,
                            // debugRender: true, // Show the viewport bounds
                            padLeft: 0,
                            padRight: 0,
                            padTop: 0,
                            padBottom: 0,
                        },
                        backgroundImage: {
                            url: './dyn_illust_char_1028_texas2_bg.png',
                            width: 2048,
                            height: 2048,
                            x: -955 - 40,
                            y: -730 - 20,
                        },
                        alpha: true, // Enable player translucency
                        backgroundColor: '#00000000', // Background is fully transparent
                        showControls: false,
                    },
                    scale: 1.95,
                    offsetX: -0.53,
                    offsetY: -0.5,
                    duration: 10000,
                },
            ],
        },
        pictureSizeType: 0,
        playMode: 0,
        switchInterval: 5,
        textList: [],
    }
}