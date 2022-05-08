import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ShellModule } from '@world/shell';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, ShellModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
