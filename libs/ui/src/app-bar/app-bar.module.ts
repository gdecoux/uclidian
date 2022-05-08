import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppBarComponent, AppBarSection, AppBarTitle } from './app-bar.component';

@NgModule({
  imports: [CommonModule, MatToolbarModule],
  declarations: [AppBarComponent, AppBarSection, AppBarTitle],
  exports: [AppBarComponent, AppBarSection, AppBarTitle],
})
export class AppBarModule {}
