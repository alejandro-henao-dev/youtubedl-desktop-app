const electron=require('electron')
const log = require('electron-log');
const path=require("path")
const url=require('url')

const {app, BrowserWindow, ipcMain}=electron;

var uiPath=url.format({
    pathname: path.join(__dirname, 'client-build/index.html'),
    protocol: 'file:',
    slashes: true
  })

let   mainWindow

app.on('ready',()=>{
    mainWindow=new BrowserWindow({

      width:550,
      height:700,
      webPreferences: {
        nodeIntegration: true
      }
    });
    mainWindow.loadURL(`${uiPath}`)
})

ipcMain.on('test',(e,data)=>{
  console.log(a);
})