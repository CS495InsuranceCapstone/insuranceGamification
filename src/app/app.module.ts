import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent, CapitalizePipe, CommafyPipe, RoundPipe } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    CapitalizePipe,
    CommafyPipe,
    RoundPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
