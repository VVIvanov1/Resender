const electron = require('electron')
const {contextBridge, ipcRenderer} = electron;

contextBridge.exposeInMainWorld('api', {
    send: (channel, data) => {
        let validChannels = ['toMain:path'];
        if(validChannels.includes(channel)){
            ipcRenderer.send(channel, data)
            
        }
    },
    receive: (channel, func) => {
        let validChannels = ['fromMain:path'];
        if(validChannels.includes(channel)){
            ipcRenderer.on(channel, (event, ...args) => func(...args))
        }
    }
})