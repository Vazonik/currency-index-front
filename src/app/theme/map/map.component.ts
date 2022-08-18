import { Component } from '@angular/core';
import { countries } from './map-svg-data';

@Component({
  selector: 'ci-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  public mapData = countries;
}
