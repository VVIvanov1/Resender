// const electron = require('electron')
const { app, BrowserWindow, ipcMain, dialog } = electron;
const path = require('path');

let MainWindow;

app.on('ready', () => {
    MainWindow = new BrowserWindow({
        width: 300,
        height: 500,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
            nativeWindowOpen: true,
            enableRemoteModule: false
        }
    })
    MainWindow.loadURL(`file://${__dirname}/index.html`)
})

ipcMain.on('toMain:path', async (event, args) => {
    const res = await dialog.showOpenDialog(MainWindow, {
        properties: ['openDirectory']
    })
    MainWindow.webContents.send('fromMain:path',await res)
    
})
// ipcMain.on("toMain:person", (event, args) => {
//     console.log(args);
//     MainWindow.webContents.send('fromMain:person', args)

// });

// ipcMain.on("toMain:car", (event, args) => {
//     console.log(args);
//     MainWindow.webContents.send('fromMain:car', args)

// });
// ipcMain.on("toMain:test", async (event, args) =>{
//     const res = await dialog.showOpenDialog(MainWindow, {
//         properties: ["openDirectory"]
//     })
//     // console.log(res);
//     MainWindow.webContents.send('fromMain:path', res)
// })
// some comments here
