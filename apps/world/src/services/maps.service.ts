import { Injectable } from '@angular/core';
import { from, map } from 'rxjs';
import { directus, Map } from './directus';

const LAYERS_FIELDS = ['id', 'name', 'cluster', 'clusterMaxZoom', 'clusterRadius', 'file', 'style'];
const MAPS_FIELDS = ['id', 'title', 'slug', 'style', 'center', 'zoom', 'defaultLayers'];

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
        return data[0] as Map;
      })
    );
  }
}

/* utils */

function joinFields(base: string[], fields: string[], path: string) {
  const mapped = fields.map((field) => `${path}.${field}`);
  return [...base, ...mapped];
}
