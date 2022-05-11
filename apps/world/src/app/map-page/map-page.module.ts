import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveComponentModule } from '@ngrx/component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

import { MglModule } from '@atrius/mgl';
import { environment } from '@world/environments/environment';

import { MapResolver } from './services';
import { MapPageComponent } from './map-page.component';
import { LayersModule } from './layers/layers.module';
import { LayerListModule } from './layer-list/layer-list.module';

const routes: Routes = [
  {
    path: ':slug',
    component: MapPageComponent,
    resolve: { map: MapResolver },
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveComponentModule,
    MatSidenavModule,
    MatIconModule,
    MglModule.withConfig({ accessToken: environment.mapboxToken }),
    LayersModule,
    LayerListModule,
  ],
  declarations: [MapPageComponent],
})
export class MapPageModule {}
