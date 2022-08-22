import { NgModule } from '@angular/core';
import { MapModule } from '../theme/map/map.module';
import { ExploreRoutingModule } from './explore-routing.module';
import { ExploreComponent } from './explore.component';
import { TableModule } from './table/table.module';

@NgModule({
  declarations: [ExploreComponent],
  imports: [ExploreRoutingModule, MapModule, TableModule],
})
export class ExploreModule {}
