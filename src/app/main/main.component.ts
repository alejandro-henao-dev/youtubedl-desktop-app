import { Component, OnInit } from '@angular/core';
import { IpcRenderer } from 'electron';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  private ipc: IpcRenderer =window.require('electron').ipcRenderer
  
  downloading=false;
  constructor() { 


  }

  ngOnInit(): void {
  }
  

  getInfo(){
    this.ipc.send("get:metadata","dasdasdasd")
  }
  submit(){
    this.downloading=true
    this.ipc.send('download',"asdasdasd")
  }

}
