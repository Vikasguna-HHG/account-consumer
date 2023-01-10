import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DataTablesModule } from "angular-datatables";
import { Demo1Component } from './demo1/demo1.component';
import { Demo2Component } from './demo2/demo2.component';
import { HighlighterPipe } from './highlighter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    Demo1Component,
    Demo2Component,
    HighlighterPipe,
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
