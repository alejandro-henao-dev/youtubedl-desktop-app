const electron=require('electron')
const log = require('electron-log');
const path=require("path")
const url=require('url')

const ytdl=require('./ytdl')

const {app, BrowserWindow, ipcMain}=electron;

var uiPath=url.format({
    pathname: path.join(__dirname, 'client-build/index.html'),
    protocol: 'file:',
    slashes: true
  })

let   mainWindow



var ytdlIntance

ipcMain.on('url:request:metadata',async (e,data)=>{
  ytdlIntance=new ytdl(data.url, data.output)
  
  if(!await ytdlIntance.valid()){
    mainWindow.webContents.send('url:response:metadata',null)
    return
  }

  await ytdlIntance.getData()
  mainWindow.webContents.send('url:response:metadata',
    ytdlIntance.metadata
  )
})

ipcMain.on('url:request:download',async (e)=>{
  var dl=ytdlIntance.download()
  dl.on('progress',(chunkLength,downloaded,total)=>{
    var progress=Math.floor((downloaded*100)/total)
    process.stdout.write("\r"+progress+"\r")
    mainWindow.webContents.send('url:response:progress',
      progress
    )
  })
})

ipcMain.on("url:request:cancel",(e)=>{
  ytdlIntance.destroy()
})

ipcMain.on('config:request:default-outdir',async (e,data)=>{
  mainWindow.webContents.send('config:response:default-outdir',path.resolve( process.env["USERPROFILE"],"Documents"))
})

ipcMain.on('helper:request:selectDirectory', function() {
  const {dialog} = require('electron') 
  dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory',"createDirectory"]
  }).then(data=>{
      mainWindow.webContents.send('helper:response:selectDirectory',data.filePaths[0])
  })
  
  
});


app.on('ready',()=>{
  mainWindow=new BrowserWindow({

    width:550,
    height:700,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadURL(`${uiPath}`)
  mainWindow.removeMenu()
})