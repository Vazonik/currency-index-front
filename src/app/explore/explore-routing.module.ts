import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { ExploreComponent } from './explore.component';

const routes: Routes = [
  {
    path: '',
    component: ExploreComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    loadChildren: () => import('./details/details.module').then(m => m.DetailsModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExploreRoutingModule {}