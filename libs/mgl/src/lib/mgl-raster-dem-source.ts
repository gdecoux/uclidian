import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RasterDemSource } from 'mapbox-gl';
import { MglSource } from './mgl-source';
import { compactObj } from './utils';

@Component({
  selector: 'mgl-raster-dem-source',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MglSource, useExisting: MglRasterDemSource }],
})
export class MglRasterDemSource extends MglSource<RasterDemSource> implements OnChanges {
  @Input() url?: RasterDemSource['url'];
  @Input() tiles?: RasterDemSource['tiles'];
  @Input() bounds?: RasterDemSource['bounds'];
  @Input() minzoom?: RasterDemSource['minzoom'];
  @Input() maxzoom?: RasterDemSource['maxzoom'];
  @Input() tileSize?: RasterDemSource['tileSize'];
  @Input() attribution?: RasterDemSource['attribution'];
  @Input() encoding?: RasterDemSource['encoding'];

  @Input() terrain?: boolean;
  @Input() exaggeration?: number = 1;

  override getSource(): RasterDemSource {
    return compactObj({
      type: 'raster-dem',
      url: this.url,
      tiles: this.tiles,
      bounds: this.bounds,
      minzoom: this.minzoom,
      maxzoom: this.maxzoom,
      tileSize: this.tileSize,
      attribution: this.attribution,
      encoding: this.encoding,
    });
  }

  ngOnChanges({ terrain }: SimpleChanges) {
    if (terrain && !terrain.firstChange) {
      this.setTerrain();
    }
  }

  override addSource() {
    super.addSource();

    if (this.terrain) {
      this.setTerrain();
    }
  }

  private setTerrain() {
    this.mglMap.setTerrain({
      source: this.id,
      exaggeration: this.exaggeration,
    });
  }
}
