import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MapLayer } from '../services';

@Component({
  selector: 'atrius-map-layers',
  template: `
    <ng-container *ngIf="layers">
      <atrius-map-layer
        *ngFor="let layer of layers; trackBy: trackByLayer"
        [layer]="layer"
      ></atrius-map-layer>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayersComponent {
  @Input() layers: MapLayer[];

  trackByLayer(_: number, layer: MapLayer) {
    return layer.id;
  }
}
