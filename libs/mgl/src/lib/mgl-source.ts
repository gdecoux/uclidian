import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AnySourceData, AnySourceImpl } from 'mapbox-gl';
import { concatWith, filter, Subject, takeUntil } from 'rxjs';
import { MglMap } from './mgl-map';

@Component({
  selector: 'mgl-source',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MglSource<T extends AnySourceImpl = AnySourceImpl> implements OnInit, OnDestroy {
  @Input('source') sourceData: AnySourceData;

  @Input() id: string;

  protected destroy$ = new Subject<void>();

  get source(): T {
    return this.mglMap.getSource(this.id) as T;
  }

  constructor(protected mglMap: MglMap, private zone: NgZone) {}

  ngOnInit() {
    this.mglMap.loaded$
      .pipe(
        concatWith(this.mglMap.mapEvent('styledata', false)),
        filter(() => !this.mglMap.getSource(this.id)),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.addSource());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.source) {
      this.removeSource();
    }
  }

  getSource(): AnySourceData {
    return this.sourceData;
  }

  protected addSource() {
    this.mglMap.addSource(this.id, this.getSource());
  }

  protected removeSource() {
    this.zone.runOutsideAngular(() => {
      // make sure source is removed after layers
      setTimeout(() => this.mglMap.removeSource(this.id), 0);
    });
  }
}
