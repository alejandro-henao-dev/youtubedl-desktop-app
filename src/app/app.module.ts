import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LoaderSpinnerComponent } from './components/loader-spinner/loader-spinner.component';
import { PopupComponent } from './components/popup/popup.component';
import { DownloadCompleteComponent } from './components/download-complete/download-complete.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoaderSpinnerComponent,
    PopupComponent,
    DownloadCompleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
