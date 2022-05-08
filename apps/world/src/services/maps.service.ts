import { Injectable } from '@angular/core';
import { from, map } from 'rxjs';
import { directus, Layer, Map } from './directus';

const LAYERS_FIELDS = ['id', 'name', 'cluster', 'clusterMaxZoom', 'clusterRadius', 'file', 'style'];
const MAPS_FIELDS = ['id', 'title', 'slug', 'style', 'center', 'zoom', 'defaultLayers'];

type MapItemBase = Omit<Map, 'layers'>;
type LayerItemBase = Layer;

export type LayerItem = LayerItemBase;

export interface MapItem extends MapItemBase {
  layers: LayerItem[];
}

@Injectable({ providedIn: 'root' })
export class MapsService {
  getMapItem(slug: string) {
    return from(
      directus.items('maps').readByQuery({
        filter: { slug: { _eq: slug } },
        fields: joinFields(MAPS_FIELDS, LAYERS_FIELDS, 'layers.layer'),
      })
    ).pipe(
      map((items) => {
        const data = items.data || [];
        const item = data[0] as Map;
        return this.toMapItem(item);
      })
    );
  }

  private toMapItem({ layers, ...rest }: Map): MapItem {
    return {
      ...rest,
      layers: layers.map(({ layer }) => layer),
    };
  }
}

/* utils */

function joinFields(base: string[], fields: string[], path: string) {
  const mapped = fields.map((field) => `${path}.${field}`);
  return [...base, ...mapped];
}
