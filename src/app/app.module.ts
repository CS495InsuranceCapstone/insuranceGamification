import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent, CapitalizePipe, CommafyPipe } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    CapitalizePipe,
    CommafyPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
