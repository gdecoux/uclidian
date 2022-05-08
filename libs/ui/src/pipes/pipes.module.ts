import { NgModule } from '@angular/core';
import { InitialsPipe } from './initials.pipe';

@NgModule({
  declarations: [InitialsPipe],
  exports: [InitialsPipe],
})
export class PipesModule {}
