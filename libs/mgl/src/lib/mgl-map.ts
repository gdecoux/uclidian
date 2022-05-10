import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { coerceCssPixelValue } from '@angular/cdk/coercion';
import {
  AnimationOptions,
  AnyLayer,
  AnySourceData,
  AnySourceImpl,
  Control,
  EaseToOptions,
  EventData,
  FitBoundsOptions,
  FlyToOptions,
  IControl,
  LngLatBoundsLike,
  LngLatLike,
  Map,
  MapboxGeoJSONFeature,
  MapEventType,
  MapLayerEventType,
  PointLike,
  Style,
} from 'mapbox-gl';
import {
  AsyncSubject,
  first,
  fromEventPattern,
  Observable,
  ReplaySubject,
  share,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { MAPBOX_TOKEN } from './mgl-config';

type DefaultOptions = {
  style: string;
  center: LngLatLike;
  bearing: number;
  pitch: number;
  zoom: number;
};

const DEFAULT_OPTIONS: DefaultOptions = {
  style: 'mapbox://styles/mapbox/dark-v10',
  center: [-98.32553, 36.641042],
  bearing: 0,
  pitch: 0,
  zoom: 3,
};

const DEFAULT_HEIGHT = '100%';
const DEFAULT_WIDTH = '100%';

@Component({
  selector: 'mgl-map',
  template: `
    <div #map class="map-container"></div>
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MglMap implements OnInit, OnChanges, OnDestroy {
  private destroy$ = new Subject<void>();
  loaded$ = new AsyncSubject<void>();

  map$ = new ReplaySubject<Map>(1);
  map: Map;

  @ViewChild('map', { static: true }) containerRef: ElementRef<HTMLDivElement>;

  @Input() height: string | number = DEFAULT_HEIGHT;
  @Input() width: string | number = DEFAULT_WIDTH;

  @Input() style: string;
  @Input() center: LngLatLike;
  @Input() bearing: number;
  @Input() pitch: number;
  @Input() zoom: number;

  @Output() mapClick = this.mapEvent('click');
  @Output() mapMouseMove = this.mapEvent('mousemove');
  @Output() mapMove = this.mapEvent('move');
  @Output() mapLoad = this.mapEvent('load');
  @Output() mapStyleData = this.mapEvent('styledata');

  get mapElement(): HTMLElement {
    return this.containerRef.nativeElement;
  }

  constructor(@Inject(MAPBOX_TOKEN) private accessToken: string, private zone: NgZone) {}

  ngOnInit() {
    this.zone.onStable.pipe(first()).subscribe(() => {
      this.initMap();
    });
  }

  ngOnChanges({ height, width, style, center, bearing, pitch, zoom }: SimpleChanges) {
    if ((height && !height.firstChange) || (width && !width.firstChange)) {
      this.setSize();
    }

    if (style && !style.firstChange) {
      this.map.setStyle(this.style);
    }

    if (center && !center.firstChange) {
      this.map.setCenter(this.center);
    }

    if (bearing && !bearing.firstChange) {
      this.map.setBearing(this.bearing);
    }

    if (pitch && !pitch.firstChange) {
      this.map.setPitch(this.pitch);
    }

    if (zoom && !zoom.firstChange) {
      this.map.setZoom(this.zoom);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  zoomIn(options?: AnimationOptions, eventData?: EventData) {
    return this.zone.runOutsideAngular(() => {
      return this.map.zoomIn(options, eventData);
    });
  }

  zoomOut(options?: AnimationOptions, eventData?: EventData) {
    return this.zone.runOutsideAngular(() => {
      return this.map.zoomOut(options, eventData);
    });
  }

  resetNorth(options?: AnimationOptions, eventData?: EventData) {
    return this.zone.runOutsideAngular(() => {
      return this.map.resetNorth(options, eventData);
    });
  }

  setStyle(style: string | Style) {
    return this.zone.runOutsideAngular(() => {
      return this.map.setStyle(style);
    });
  }

  getSource<T extends AnySourceImpl>(id: string): T {
    return this.zone.runOutsideAngular(() => {
      return this.map.getSource(id) as T;
    });
  }

  addSource(id: string, source: AnySourceData) {
    return this.zone.runOutsideAngular(() => {
      return this.map.addSource(id, source);
    });
  }

  removeSource(id: string) {
    return this.zone.runOutsideAngular(() => {
      return this.map.removeSource(id);
    });
  }

  getLayer<T extends AnyLayer>(id: string): T {
    return this.zone.runOutsideAngular(() => {
      return this.map.getLayer(id) as T;
    });
  }

  addLayer(layer: AnyLayer, before?: string) {
    return this.zone.runOutsideAngular(() => {
      return this.map.addLayer(layer, before);
    });
  }

  moveLayer(id: string, beforeId: string) {
    return this.zone.runOutsideAngular(() => {
      return this.map.moveLayer(id, beforeId);
    });
  }

  removeLayer(id: string) {
    return this.zone.runOutsideAngular(() => {
      return this.map.removeLayer(id);
    });
  }

  setFilter(id: string, filter?: boolean | any[] | null | undefined) {
    return this.zone.runOutsideAngular(() => {
      return this.map.setFilter(id, filter);
    });
  }

  setLayerZoomRange(id: string, minzoom: number, maxzoom: number) {
    return this.zone.runOutsideAngular(() => {
      return this.map.setLayerZoomRange(id, minzoom, maxzoom);
    });
  }

  setLayoutProperty(id: string, name: string, value: any) {
    return this.zone.runOutsideAngular(() => {
      return this.map.setLayoutProperty(id, name, value);
    });
  }

  setPaintProperty(id: string, name: string, value: any, klass?: string | undefined) {
    return this.zone.runOutsideAngular(() => {
      return this.map.setPaintProperty(id, name, value, klass);
    });
  }

  addControl(
    control: Control | IControl,
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  ) {
    return this.zone.runOutsideAngular(() => {
      return this.map.addControl(control, position);
    });
  }

  removeControl(control: Control | IControl) {
    return this.zone.runOutsideAngular(() => {
      return this.map.removeControl(control);
    });
  }

  easeTo(options: EaseToOptions, eventData?: EventData) {
    return this.zone.runOutsideAngular(() => {
      return this.map.easeTo(options, eventData);
    });
  }

  flyTo(options: FlyToOptions, eventData?: EventData) {
    return this.zone.runOutsideAngular(() => {
      return this.map.flyTo(options, eventData);
    });
  }

  fitBounds(bounds: LngLatBoundsLike, options: FitBoundsOptions) {
    return this.zone.runOutsideAngular(() => {
      return this.map.fitBounds(bounds, options);
    });
  }

  queryRenderedFeatures(
    pointOrBox?: PointLike | [PointLike, PointLike],
    options?: { layers?: string[]; filter?: any[]; validate?: boolean }
  ): MapboxGeoJSONFeature[] {
    return this.map.queryRenderedFeatures(pointOrBox, options);
  }

  setCursor(cursor: string) {
    this.map.getCanvas().style.cursor = cursor;
  }

  layerEvent<T extends keyof MapLayerEventType>(layerId: string, event: T, inZone = true) {
    const event$ = this.withMap((map) => {
      return fromEventPattern<MapLayerEventType[T] & EventData>(
        (hander) => map.on(event, layerId, hander),
        (handler) => map.off(event, layerId, handler)
      );
    }).pipe(share());

    return inZone ? event$.pipe(runInZone(this.zone)) : event$;
  }

  mapEvent<T extends keyof MapEventType>(event: T, inZone = true) {
    const event$ = this.withMap((map) => {
      return fromEventPattern<MapEventType[T] & EventData>(
        (hander) => map.on(event, hander),
        (handler) => map.off(event, handler)
      );
    }).pipe(share());

    return inZone ? event$.pipe(runInZone(this.zone)) : event$;
  }

  private setSize() {
    this.mapElement.style.height = coerceCssPixelValue(this.height) || DEFAULT_HEIGHT;
    this.mapElement.style.width = coerceCssPixelValue(this.width) || DEFAULT_WIDTH;
    this.map.resize();
  }

  private initMap() {
    this.map = new Map({
      container: this.containerRef.nativeElement,
      style: this.style || DEFAULT_OPTIONS.style,
      center: this.center || DEFAULT_OPTIONS.center,
      bearing: this.bearing || DEFAULT_OPTIONS.bearing,
      pitch: this.pitch || DEFAULT_OPTIONS.pitch,
      zoom: this.zoom || DEFAULT_OPTIONS.zoom,
      accessToken: this.accessToken,
      attributionControl: false,
    });

    this.map.once('load', () => {
      this.loaded$.next();
      this.loaded$.complete();
    });

    this.setSize();

    this.map$.next(this.map);
  }

  private withMap<T>(cb: (map: Map) => Observable<T>) {
    return this.map$.pipe(switchMap(cb), takeUntil(this.destroy$));
  }
}

function runInZone<T>(zone: NgZone) {
  return (source: Observable<T>) =>
    new Observable<T>((observer) => {
      const sub = source.subscribe({
        next: (value) => zone.run(() => observer.next(value)),
        error: (error) => observer.error(error),
        complete: () => observer.complete(),
      });

      return () => {
        sub.unsubscribe();
      };
    });
}
