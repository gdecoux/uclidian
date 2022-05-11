import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { environment } from '@world/environments/environment';
import { DefaultLayer, Map } from '@world/services/directus';
import { AnyLayer, LngLatLike } from 'mapbox-gl';

export interface MapLayer {
  id: string;
  name: string;
  visible: boolean;
  layer: Partial<AnyLayer>;
  dataUrl: string;
}

export interface MapState extends EntityState<MapLayer> {
  center: LngLatLike;
  zoom: number;
  style: string;
  defaultLayers: DefaultLayer[];
}

const adapter = createEntityAdapter<MapLayer>();
const { selectAll } = adapter.getSelectors();

@Injectable({ providedIn: 'root' })
export class MapStore extends ComponentStore<MapState> {
  layers$ = this.select(selectAll);
  defaultLayers$ = this.select((state) => state.defaultLayers);
  mapState$ = this.select(({ center, zoom, style, defaultLayers }) => ({
    center,
    zoom,
    style,
    defaultLayers,
  }));

  toggleLayer = this.updater((state, id: string) =>
    adapter.updateOne({ id, changes: { visible: !state.entities[id]?.visible } }, state)
  );

  setMap(map: Map) {
    const { center, zoom, style, defaultLayers } = map;
    const layers = map.layers.map(({ layer }): MapLayer => {
      const { id, name, style, file } = layer;

      return {
        id,
        name,
        visible: true,
        dataUrl: `${environment.directusUrl}/assets/${file}`,
        layer: {
          ...style,
        },
      };
    });

    const intialState = adapter.getInitialState({
      center: center.coordinates as LngLatLike,
      zoom,
      style,
      defaultLayers,
    });

    this.setState(adapter.setAll(layers, intialState));
  }
}
