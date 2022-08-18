import { NgModule } from '@angular/core';
import { MapModule } from '../theme/map/map.module';
import { ExploreRoutingModule } from './explore-routing.module';
import { ExploreComponent } from './explore.component';

@NgModule({
  declarations: [ExploreComponent],
  imports: [ExploreRoutingModule, MapModule],
})
export class ExploreModule {}
