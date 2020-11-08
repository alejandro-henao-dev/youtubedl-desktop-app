import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  private ipc: IpcRenderer =window.require('electron').ipcRenderer
  private defaultPath
  constructor(
  ) { 
    this.ipc.on("url:response:metadata",(e,data)=>{
      this.defaultPath=data
    })

  }


  getMetadata(url,output){
    return new Promise((resolve,reject)=>{
      this.ipc.send("url:request:metadata",{url:url,output:output})
      this.ipc.on("url:response:metadata",(e,data)=>{
        resolve(data)
      })
    })
  }

  getDefaultPath(){
    return new Promise((resolve,reject)=>{
      this.ipc.send("config:request:default-outdir")
      this.ipc.on("config:response:default-outdir",(e,data)=>{
        resolve(data)
      })
    })
  }

  download(){
    this.ipc.send("url:request:download",null)
    var obs$=new Observable(observer=>{
      this.ipc.on("url:response:progress",(e,data)=>{
        
        observer.next(data)
        if(data >= 100){
          observer.complete();
        }
      })
    })
    
    return obs$
  }

  SelectOutput(){
   
    return new Promise((resolve,reject)=>{
      this.ipc.on("helper:response:selectDirectory",(e,data)=>{
        resolve(data)
      })
      this.ipc.send("helper:request:selectDirectory")
    })
    
  }


  cancel(){
    this.ipc.send("url:request:cancel",null)
  }

}
