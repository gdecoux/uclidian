import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { MapsService } from '@world/services';
import { Map } from '@world/services/directus';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MapResolver implements Resolve<Map> {
  constructor(private mapsService: MapsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Map> {
    return this.mapsService.getMapItem(route.params['slug']);
  }
}
