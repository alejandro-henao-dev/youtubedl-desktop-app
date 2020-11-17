import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-download-complete',
  templateUrl: './download-complete.component.html',
  styleUrls: ['./download-complete.component.scss']
})
export class DownloadCompleteComponent implements OnInit {

  @Input("open") open;
  @Output("close") closeE:EventEmitter<void>;
  constructor() { 
    this.closeE=new EventEmitter<void>();
  }

  ngOnInit(): void {
  }

  onClose(){
    this.closeE.emit()
  }



}
