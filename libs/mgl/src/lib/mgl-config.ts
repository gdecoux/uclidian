import { InjectionToken } from '@angular/core';

export interface MglModuleConfig {
  accessToken?: string;
}

export const MAPBOX_TOKEN = new InjectionToken('atrius/mgl/token');
