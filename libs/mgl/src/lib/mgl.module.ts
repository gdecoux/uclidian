import { ModuleWithProviders, NgModule } from '@angular/core';
import { MAPBOX_TOKEN, MglModuleConfig } from './mgl-config';

import { MglMap } from './mgl-map';
import { MglLayer } from './mgl-layer';
import { MglSource } from './mgl-source';
import { MglGeoJSONSource } from './mgl-geojson-source';
import { MglRasterDemSource } from './mgl-raster-dem-source';

const COMPONENTS = [MglMap, MglLayer, MglSource, MglGeoJSONSource, MglRasterDemSource];

@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class MglModule {
  static withConfig({ accessToken }: MglModuleConfig): ModuleWithProviders<MglModule> {
    return {
      ngModule: MglModule,
      providers: [{ provide: MAPBOX_TOKEN, useValue: accessToken }],
    };
  }
}
