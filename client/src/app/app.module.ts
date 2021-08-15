import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { StartDayComponent } from './components/start-day/start-day.component';

const material = [MatButtonModule, MatToolbarModule];

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    StartDayComponent
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
