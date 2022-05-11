import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DefaultLayer } from '@world/services/directus';
import { FillExtrusionLayer, SkyLayer } from 'mapbox-gl';

const buildings: FillExtrusionLayer = {
  id: '3d-buildings',
  source: 'composite',
  'source-layer': 'building',
  filter: ['==', 'extrude', 'true'],
  type: 'fill-extrusion',
  minzoom: 15,
  paint: {
    'fill-extrusion-color': '#aaa',
    'fill-extrusion-height': ['interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'height']],
    'fill-extrusion-base': [
      'interpolate',
      ['linear'],
      ['zoom'],
      15,
      0,
      15.05,
      ['get', 'min_height'],
    ],
    'fill-extrusion-opacity': 0.8,
  },
};

@Component({
  selector: 'atrius-map-default-layers',
  template: `
    <ng-container *ngIf="showTerrain">
      <mgl-raster-dem-source
        id="mapbox-dem"
        url="mapbox://mapbox.terrain-rgb"
        [tileSize]="512"
        [maxzoom]="14"
        [terrain]="true"
      ></mgl-raster-dem-source>

      <mgl-layer [id]="skyLayer.id" [layer]="skyLayer"></mgl-layer>
    </ng-container>

    <ng-container *ngIf="showBuildings">
      <mgl-layer [id]="buildingsLayer.id" [layer]="buildingsLayer"></mgl-layer>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultLayersComponent {
  @Input() defaultLayers: DefaultLayer[];

  skyLayer: SkyLayer = {
    id: 'sky',
    type: 'sky',
    paint: {
      'sky-type': 'atmosphere',
      'sky-atmosphere-sun': [0.0, 0.0],
      'sky-atmosphere-sun-intensity': 15,
    },
  };

  buildingsLayer = buildings;

  get showTerrain() {
    return this.defaultLayers.includes('terrain');
  }

  get showBuildings() {
    return this.defaultLayers.includes('buildings');
  }
}
