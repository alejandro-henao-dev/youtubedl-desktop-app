import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  @Input("open") open;
  @Output("replace") replace:EventEmitter<boolean>;
  constructor() { 
    this.replace=new EventEmitter<boolean>()
  }

  ngOnInit(): void {
  }

  onCancel(){
    this.replace.emit(false)
  }

  onReplace(){
    this.replace.emit(true)
  }

}
