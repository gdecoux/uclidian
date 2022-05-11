import { NgModule } from '@angular/core';
import { MglModule } from '@atrius/mgl';

import { LayersComponent } from './layers.component';
import { LayerComponent } from './layer.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, MglModule],
  declarations: [LayersComponent, LayerComponent],
  exports: [LayersComponent, LayerComponent],
})
export class LayersModule {}
