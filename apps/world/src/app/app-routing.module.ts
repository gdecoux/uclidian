import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from '@world/error-page';

const routes: Routes = [
  {
    path: '404',
    component: ErrorPageComponent,
  },
  {
    path: '',
    loadChildren: () => import('@world/map-page').then((m) => m.MapPageModule),
  },
  {
    path: '**',
    component: ErrorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
