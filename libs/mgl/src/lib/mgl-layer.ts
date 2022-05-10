import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AnyLayer, AnyLayout, AnyPaint, Layer } from 'mapbox-gl';
import { concatWith, filter, Observable, ReplaySubject, Subject, switchMap, takeUntil } from 'rxjs';
import { MglMap } from './mgl-map';
import { MglSource } from './mgl-source';
import { compactObj } from './utils';

@Component({
  selector: 'mgl-layer',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MglLayer<T extends AnyLayer = AnyLayer> implements OnInit, OnChanges, OnDestroy {
  @Input() id: Layer['id'];
  @Input() type: AnyLayer['type'];
  @Input() metadata?: Layer['metadata'];
  @Input() source?: Layer['source'];
  @Input() sourceLayer?: Layer['source-layer'];
  @Input() minzoom?: Layer['minzoom'];
  @Input() maxzoom?: Layer['maxzoom'];
  @Input() interactive?: Layer['interactive'];
  @Input() filter?: Layer['filter'];
  @Input() layout?: Layer['layout'];
  @Input() paint?: Layer['paint'];

  // initial prop only, does not get updated if changed
  @Input('layer') base: Partial<Layer> = {};

  @Input() before?: string;
  @Input() visible = true;

  private destroy$ = new Subject<void>();
  private id$ = new ReplaySubject<string>(1);

  @Output() layerClick = this.withId((id) => this.mglMap.layerEvent(id, 'click'));
  @Output() layerMouseEnter = this.withId((id) => this.mglMap.layerEvent(id, 'mouseenter'));
  @Output() layerMouseLeave = this.withId((id) => this.mglMap.layerEvent(id, 'mouseleave'));
  @Output() layerMouseMove = this.withId((id) => this.mglMap.layerEvent(id, 'mousemove'));

  get layer(): T {
    return this.mglMap.getLayer<T>(this.id);
  }

  constructor(private mglMap: MglMap, @Optional() private parent: MglSource) {}

  ngOnInit() {
    this.mglMap.loaded$
      .pipe(
        concatWith(this.mglMap.mapEvent('styledata', false)),
        filter(() => !this.mglMap.getLayer(this.id)),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.addLayer());

    this.id$.next(this.id);
  }

  ngOnChanges({ paint, layout, filter, before, minzoom, maxzoom, visible }: SimpleChanges) {
    if (paint && !paint.firstChange) {
      this.setPaint();
    }

    if (layout && !layout.firstChange) {
      this.setLayout();
    }

    if (visible && !visible.firstChange) {
      this.setVisibility();
    }

    if (filter && !filter.firstChange) {
      this.mglMap.setFilter(this.id, this.filter);
    }

    if (before && !before.firstChange && this.before) {
      this.mglMap.moveLayer(this.id, this.before);
    }

    if ((minzoom && !minzoom.firstChange) || (maxzoom && !maxzoom.firstChange)) {
      if (this.minzoom != null && this.maxzoom != null) {
        this.mglMap.setLayerZoomRange(this.id, this.minzoom, this.maxzoom);
      }
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.layer) {
      this.mglMap.removeLayer(this.id);
    }
  }

  private getLayout(): AnyLayout {
    const layout = this.layout || (this.base && this.base.layout) || {};

    return {
      ...layout,
      visibility: this.visible ? 'visible' : 'none',
    };
  }

  private getLayer(): AnyLayer {
    const layer = compactObj({
      id: this.id,
      type: this.type,
      metadata: this.metadata,
      source: this.source || this.parent?.id,
      'source-layer': this.sourceLayer,
      minzoom: this.minzoom,
      maxzoom: this.maxzoom,
      interactive: this.interactive,
      filter: this.filter,
      layout: this.getLayout(),
      paint: this.paint,
    } as AnyLayer);

    return {
      ...this.base,
      ...layer,
    } as AnyLayer;
  }

  private addLayer() {
    this.mglMap.addLayer(this.getLayer(), this.before);
  }

  private setLayout() {
    const layout = this.getLayout();

    if (!layout) return;

    for (const key in layout) {
      this.mglMap.setLayoutProperty(this.id, key, layout[key]);
    }
  }

  private setPaint() {
    if (!this.paint) return;

    for (const key in this.paint) {
      this.mglMap.setPaintProperty(this.id, key, this.paint[key as keyof AnyPaint]);
    }
  }

  private setVisibility() {
    const value = this.visible ? 'visible' : 'none';
    this.mglMap.setLayoutProperty(this.id, 'visibility', value);
  }

  private withId<T>(cb: (id: string) => Observable<T>) {
    return this.id$.pipe(switchMap(cb), takeUntil(this.destroy$));
  }
}
