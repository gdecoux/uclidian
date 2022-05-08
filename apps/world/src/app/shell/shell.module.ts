import { NgModule } from '@angular/core';
import { AppBarModule } from '@atrius/ui/app-bar';

import { ShellComponent } from './shell.component';

@NgModule({
  imports: [AppBarModule],
  declarations: [ShellComponent],
  exports: [ShellComponent],
})
export class ShellModule {}
