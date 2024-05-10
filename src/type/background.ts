// import { spine } from '../lib/spine-player'
// import SpinePlayerConfig = spine.SpinePlayerConfig

export type Background = ImageBackground | VideoBackground | SpineBackground

type ImageBackground = {
    type: 'image',
    path: string,
    fit: 'cover' | 'contain',
    duration: number,
}

type VideoBackground = {
    type: 'video',
    path: string,
    fit: 'cover' | 'contain',
    duration: number,
}

type SpineBackground = {
    type: 'spine',
    // spinePlayerConfig: SpinePlayerConfig
    spinePlayerConfig: any
    // backgroundImage?: {
    //     url: string;
    //     x: number;
    //     y: number;
    //     width: number;
    //     height: number;
    // };
    duration: number,
}