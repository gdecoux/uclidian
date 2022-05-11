import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MapLayer } from '../services';

@Component({
  selector: 'atrius-map-layer',
  template: `
    <mgl-geojson-source [id]="layer.id" [data]="data$ | async">
      <mgl-layer [id]="layer.id" [layer]="layer.layer" [visible]="layer.visible"></mgl-layer>
    </mgl-geojson-source>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayerComponent implements OnInit {
  @Input() layer: MapLayer;

  data$: Observable<any>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.data$ = this.http.get(this.layer.dataUrl, {
      responseType: 'json',
    });
  }
}
