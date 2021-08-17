import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LogListComponent } from './components/log-list/log-list.component';

const material = [MatButtonModule, MatToolbarModule];

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LogListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ...material
  ],
  entryComponents: [ToolbarComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
