import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'

if (import.meta.env.PROD) {
    function getUrlParams() {
        let str = window.location.search.substring(1)
        let arr = str.split('&')
        let result = {} as any

        for (let i = 0; i < arr.length; i++) {
            let arrValues = arr[i].split('=')
            result[arrValues[0]] = isNaN(Number(arrValues[1])) || arrValues[1] === '' ? arrValues[1] : Number(arrValues[1])
        }

        return result
    }

    //路由参数提取
    window.urlParams = getUrlParams()
    window.windowName = window.urlParams.windowName

    const {ipcRenderer, remote, webFrame} = require('electron')
    window.ipcRenderer = ipcRenderer
    window.webFrame = webFrame
    window.electronRemote = remote

    let renderTime = new Date().toTimeString()
    ipcRenderer.send('startRendering', {
        time: renderTime,
        windowName: window.windowName,
    })
}

createApp(App).mount('#app')
