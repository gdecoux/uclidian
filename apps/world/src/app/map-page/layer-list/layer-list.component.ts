import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MapLayer } from '../services';

@Component({
  selector: 'atrius-map-layer-list',
  template: `
    <mat-list>
      <h3 matSubheader>Layers</h3>
      <mat-divider></mat-divider>

      <mat-list-item *ngFor="let layer of layers">
        <h4 matLine>{{ layer.name }}</h4>

        <button mat-icon-button (click)="toggleLayer(layer.id)">
          <mat-icon>{{ layer.visible ? 'visibility' : 'visibility_off' }}</mat-icon>
        </button>

        <button mat-icon-button (click)="focusLayer(layer.id)">
          <mat-icon>filter_center_focus</mat-icon>
        </button>

        <mat-divider></mat-divider>
      </mat-list-item>
    </mat-list>
  `,
})
export class LayerListComponent {
  @Input() layers?: MapLayer[] = [];

  @Output() layerToggle = new EventEmitter<string>();
  @Output() layerFocus = new EventEmitter<string>();

  toggleLayer(id: string) {
    this.layerToggle.next(id);
  }

  focusLayer(id: string) {
    this.layerFocus.next(id);
  }
}
