import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EssentialsModule } from '../essentials/essentials.module';
import { MapComponent } from './map.component';

@NgModule({
  declarations: [MapComponent],
  imports: [CommonModule, EssentialsModule],
  exports: [MapComponent],
  providers: [],
})
export class MapModule {}
