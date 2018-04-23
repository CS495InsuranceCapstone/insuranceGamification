import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent, CapitalizePipe, CommafyPipe, RoundPipe } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    CapitalizePipe,
    CommafyPipe,
    RoundPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
