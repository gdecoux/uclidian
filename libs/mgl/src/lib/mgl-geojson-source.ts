import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GeoJSONSource, GeoJSONSourceOptions, GeoJSONSourceRaw } from 'mapbox-gl';
import { compactObj } from './utils';
import { MglSource } from './mgl-source';

@Component({
  selector: 'mgl-geojson-source',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MglSource, useExisting: MglGeoJSONSource }],
})
export class MglGeoJSONSource extends MglSource<GeoJSONSource> implements OnChanges {
  @Input() data?: GeoJSONSourceOptions['data'];
  @Input() maxzoom?: GeoJSONSourceOptions['maxzoom'];
  @Input() attribution?: GeoJSONSourceOptions['attribution'];
  @Input() buffer?: GeoJSONSourceOptions['buffer'];
  @Input() tolerance?: GeoJSONSourceOptions['tolerance'];
  @Input() cluster?: GeoJSONSourceOptions['cluster'];
  @Input() clusterRadius?: GeoJSONSourceOptions['clusterRadius'];
  @Input() clusterMaxZoom?: GeoJSONSourceOptions['clusterMaxZoom'];
  @Input() clusterMinPoints?: GeoJSONSourceOptions['clusterMinPoints'];
  @Input() clusterProperties?: GeoJSONSourceOptions['clusterProperties'];
  @Input() lineMetrics?: GeoJSONSourceOptions['lineMetrics'];
  @Input() generateId?: GeoJSONSourceOptions['generateId'];
  @Input() promoteId?: GeoJSONSourceOptions['promoteId'];
  @Input() filter?: GeoJSONSourceOptions['filter'];

  override getSource(): GeoJSONSourceRaw {
    return compactObj({
      type: 'geojson',
      data: this.data,
      maxzoom: this.maxzoom,
      attribution: this.attribution,
      buffer: this.buffer,
      tolerance: this.tolerance,
      cluster: this.cluster,
      clusterRadius: this.clusterRadius,
      clusterMaxZoom: this.clusterMaxZoom,
      clusterMinPoints: this.clusterMinPoints,
      clusterProperties: this.clusterProperties,
      lineMetrics: this.lineMetrics,
      generateId: this.generateId,
      promoteId: this.promoteId,
      filter: this.filter,
    });
  }

  ngOnChanges({ data }: SimpleChanges) {
    if (data && !data.firstChange) {
      this.setData();
    }
  }

  getClusterExpansionZoom(clusterId: number, callback: (error: Error, zoom: number) => void) {
    return this.source.getClusterExpansionZoom(clusterId, callback);
  }

  getClusterChildren(
    clusterId: number,
    callback: (error: Error, features: GeoJSON.Feature<GeoJSON.Geometry>[]) => void
  ) {
    return this.source.getClusterChildren(clusterId, callback);
  }

  getClusterLeaves(
    clusterId: number,
    limit: number,
    offset: number,
    callback: (error: Error, features: GeoJSON.Feature<GeoJSON.Geometry>[]) => void
  ) {
    return this.source.getClusterLeaves(clusterId, limit, offset, callback);
  }

  private setData() {
    if (this.source && this.data) {
      this.source.setData(this.data);
    }
  }
}
