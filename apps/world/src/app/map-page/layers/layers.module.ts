import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MglModule } from '@atrius/mgl';

import { LayersComponent } from './layers.component';
import { LayerComponent } from './layer.component';
import { DefaultLayersComponent } from './default-layers.component';

@NgModule({
  imports: [CommonModule, MglModule],
  declarations: [LayersComponent, LayerComponent, DefaultLayersComponent],
  exports: [LayersComponent, DefaultLayersComponent],
})
export class LayersModule {}
