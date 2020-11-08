import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ElectronService } from '../services/electron.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {
  @ViewChild("inputDir", {read: ElementRef}) inputDir: ElementRef;


  downloading=false;
  form:FormGroup
  metadata:any
  busy=false
  
  progress=0
  dlComplete=false
  constructor(
    private fb:FormBuilder,
    private electron:ElectronService,
    private ngZone: NgZone
  ) { 
  }


  async ngOnInit(){
    this.createForm()
    var x=await this.electron.getDefaultPath()
    this.form.controls.output.setValue(x)
  }
  
  ngAfterViewInit(): void {
    
  }

  async triggerInputDir(){
    var path=await this.electron.SelectOutput()
    console.log(path)
    this.form.controls.output.setValue(path)
  }

  async createForm(){
    
    this.form=this.fb.group({
      output:[""],
      url:["",[Validators.required]]
    });    
  }
  

  async getInfo(){
    this.busy=true
    var data=await this.electron.getMetadata(this.form.value.url.trim(),this.form.value.output.trim())
    this.metadata=data
    this.busy=false
  }


  async submit(){
    this.progress=0

    if(this.downloading){
      this.electron.cancel()
      this.downloading=false
      return
    }
    
    if(this.form.invalid){
      return
    }
    await this.getInfo()

    if(!this.metadata){
      return 
    }
    this.downloading=true
    this.electron.download().subscribe(
      (data:number)=>{ // on data
        this.ngZone.run(()=>{
          this.progress=data
        })
      },
      (err)=>{//on error

      },
      ()=>{//on complete
        this.ngZone.run(()=>{
          console.log("complete")
          this.dlComplete=true
          this.downloading=false
        })
      }
    )
   
  }

}
