import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { countries, CountrySVG } from './map-svg-data';
import { Vector } from 'src/app/core/helpers/vector';

const MAP_WIDTH = 2000;
const MAP_HEIGHT = 857;
const WINDOW_WIDTH = 1920;
const ZOOM_POWER = 1.4;
const MAX_ZOOM = 7;
const INIT_SCALE = 0.5;

@Component({
  selector: 'ci-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Output()
  countryClick: EventEmitter<string> = new EventEmitter<string>();

  public mapData = countries;
  public windowScaleFactor = 1;
  public mapScaleFactor = 1;
  public mapWidht = MAP_WIDTH * INIT_SCALE;
  public mapHeight = MAP_HEIGHT * INIT_SCALE;
  public scale = INIT_SCALE;
  public xTranslate = 0;
  public yTranslate = 0;
  public dragging = false;
  public countryNameHover: string | undefined = undefined;

  public ngOnInit(): void {
    this.scaleMapWithWindow(window.innerWidth);
  }

  public onResize(e: any): void {
    this.scaleMapWithWindow(e.target.innerWidth);
  }

  public zoomPlus() {
    let newMapScaleFactor = this.mapScaleFactor * ZOOM_POWER;
    if (newMapScaleFactor > MAX_ZOOM) {
      newMapScaleFactor = MAX_ZOOM;
    }

    this.zoomMap(newMapScaleFactor);
  }

  public zoomMinus() {
    let newMapScaleFactor = this.mapScaleFactor / ZOOM_POWER;
    if (newMapScaleFactor < 1) {
      newMapScaleFactor = 1;
    }

    this.zoomMap(newMapScaleFactor);
  }

  public onMouseDown(e: MouseEvent) {
    if (e.buttons == 1) {
      this.dragging = true;
    }
  }

  public onMouseUp() {
    this.dragging = false;
  }

  public onMouseMove(e: MouseEvent) {
    if (this.dragging) {
      this.dragMap({
        x: e.movementX / this.scale,
        y: e.movementY / this.scale,
      });
    }
  }

  public onCountryClick(id: string) {
    this.countryClick.emit(id);
  }

  public onCountryMouseOver(id: string) {
    this.countryNameHover = countries.find((o) => o.id == id)?.name;
  }

  public onCountryMouseOut() {
    this.countryNameHover = undefined;
  }

  private scaleMapWithWindow(windowWidth: number) {
    this.windowScaleFactor = windowWidth / WINDOW_WIDTH;
    this.scale = INIT_SCALE * this.mapScaleFactor * this.windowScaleFactor;
    this.mapWidht = this.windowScaleFactor * MAP_WIDTH * INIT_SCALE;
    this.mapHeight = this.windowScaleFactor * MAP_HEIGHT * INIT_SCALE;
  }

  private zoomMap(newMapScaleFactor: number) {
    const oldMapScaleFactor = this.mapScaleFactor;
    this.mapScaleFactor = newMapScaleFactor;
    this.scale = INIT_SCALE * this.mapScaleFactor * this.windowScaleFactor;
    this.dragMap({
      x: -(MAP_WIDTH / oldMapScaleFactor - MAP_WIDTH / newMapScaleFactor) / 2,
      y: -(MAP_HEIGHT / oldMapScaleFactor - MAP_HEIGHT / newMapScaleFactor) / 2,
    });
  }

  private dragMap(offset: Vector) {
    const MIN_X_TRANSLATE = MAP_WIDTH / this.mapScaleFactor - MAP_WIDTH;
    const MIN_Y_TRANSLATE = MAP_HEIGHT / this.mapScaleFactor - MAP_HEIGHT;

    let newXTranslate = this.xTranslate;
    let newYTranslate = this.yTranslate;

    newXTranslate += offset.x;
    newYTranslate += offset.y;

    if (newXTranslate > 0) {
      newXTranslate = 0;
    } else if (newXTranslate < MIN_X_TRANSLATE) {
      newXTranslate = MIN_X_TRANSLATE;
    }

    if (newYTranslate > 0) {
      newYTranslate = 0;
    } else if (newYTranslate < MIN_Y_TRANSLATE) {
      newYTranslate = MIN_Y_TRANSLATE;
    }

    this.xTranslate = newXTranslate;
    this.yTranslate = newYTranslate;
  }
}
