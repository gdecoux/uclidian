import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import { LngLatBoundsLike, PaddingOptions } from 'mapbox-gl';
import { MglMap } from '@atrius/mgl';
import bbox from '@turf/bbox';
import { MapStore } from './services';

@Component({
  selector: 'atrius-map-page',
  template: `
    <mat-drawer-container class="container" [hasBackdrop]="false">
      <mat-drawer
        #drawer
        class="drawer"
        mode="over"
        [opened]="true"
        [disableClose]="true"
        [autoFocus]="false"
      >
        <div class="drawer-handle" (click)="drawer.toggle()">
          <mat-icon>{{ drawer.opened ? 'arrow_left' : 'arrow_right' }}</mat-icon>
        </div>

        <atrius-map-layer-list
          [layers]="layers$ | ngrxPush"
          (layerToggle)="onLayerToggle($event)"
          (layerFocus)="onLayerFocus($event)"
        ></atrius-map-layer-list>
      </mat-drawer>

      <mat-drawer-content *ngrxLet="mapState$; let state">
        <mgl-map [style]="state.style" [center]="state.center" [zoom]="state.zoom">
          <atrius-map-layers
            *ngIf="layers$ | ngrxPush as layers"
            [layers]="layers"
          ></atrius-map-layers>

          <atrius-map-default-layers
            *ngIf="defaultLayers$ | ngrxPush as defaultLayers"
            [defaultLayers]="defaultLayers"
          ></atrius-map-default-layers>
        </mgl-map>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styleUrls: ['map-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapPageComponent implements OnInit {
  @ViewChild(MglMap) mglMap: MglMap;
  @ViewChild(MatDrawer) matDrawer: MatDrawer;

  mapState$ = this.store.mapState$;
  layers$ = this.store.layers$;
  defaultLayers$ = this.store.defaultLayers$;

  constructor(private route: ActivatedRoute, private router: Router, private store: MapStore) {}

  ngOnInit() {
    const map = this.route.snapshot.data['map'];

    if (map) {
      this.store.setMap(map);
    } else {
      this.router.navigateByUrl('/404', { skipLocationChange: true });
    }
  }

  onLayerToggle(id: string) {
    this.store.toggleLayer(id);
  }

  onLayerFocus(id: string) {
    if (!this.mglMap) return;

    const data = this.mglMap.getSource(id)['_data'];
    const bounds = bbox(data) as LngLatBoundsLike;

    const padding: PaddingOptions = {
      left: this.matDrawer.opened ? 324 : 24,
      right: 24,
      top: 24,
      bottom: 24,
    };

    this.mglMap.fitBounds(bounds, {
      padding,
    });
  }
}
