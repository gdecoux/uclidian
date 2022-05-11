import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { LayerListComponent } from './layer-list.component';

@NgModule({
  imports: [CommonModule, MatListModule, MatDividerModule, MatIconModule, MatButtonModule],
  declarations: [LayerListComponent],
  exports: [LayerListComponent],
})
export class LayerListModule {}
