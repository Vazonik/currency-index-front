import { Component, OnInit } from '@angular/core';
import { countries } from './map-svg-data';
import { Vector } from 'src/app/core/helpers/vector';

const MAP_WIDTH = 1000;
const MAP_HEIGHT = 428;
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
  public mapData = countries;

  public windowScaleFactor = 1;
  public mapScaleFactor = 1;
  public mapWidht = MAP_WIDTH;
  public mapHeight = MAP_HEIGHT;
  public scale = INIT_SCALE;
  public xTranslate = 0;
  public yTranslate = 0;
  public dragging = false;

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

  public onMouseDown() {
    this.dragging = true;
  }

  public onMouseUp() {
    this.dragging = false;
  }

  public onMouseMove(e: any) {
    if (this.dragging) {
      this.dragMap({
        x: e.movementX / this.scale,
        y: e.movementY / this.scale,
      });
    }
  }

  private scaleMapWithWindow(windowWidth: number) {
    this.windowScaleFactor = windowWidth / WINDOW_WIDTH;
    this.scale = INIT_SCALE * this.mapScaleFactor * this.windowScaleFactor;
    this.mapWidht = this.windowScaleFactor * MAP_WIDTH;
    this.mapHeight = this.windowScaleFactor * MAP_HEIGHT;
  }

  private zoomMap(newMapScaleFactor: number) {
    const oldMapScaleFactor = this.mapScaleFactor;
    this.mapScaleFactor = newMapScaleFactor;
    this.scale = INIT_SCALE * this.mapScaleFactor * this.windowScaleFactor;
    this.dragMap({
      x:
        -(
          MAP_WIDTH / (INIT_SCALE * oldMapScaleFactor) -
          MAP_WIDTH / (INIT_SCALE * newMapScaleFactor)
        ) / 2,
      y:
        -(
          MAP_HEIGHT / (INIT_SCALE * oldMapScaleFactor) -
          MAP_HEIGHT / (INIT_SCALE * newMapScaleFactor)
        ) / 2,
    });
  }

  private dragMap(offset: Vector) {
    const MIN_X_TRANSLATE =
      -MAP_WIDTH / INIT_SCALE + MAP_WIDTH / (INIT_SCALE * this.mapScaleFactor);
    const MIN_Y_TRANSLATE =
      -MAP_HEIGHT / INIT_SCALE +
      MAP_HEIGHT / (INIT_SCALE * this.mapScaleFactor);

    console.log(MIN_X_TRANSLATE);

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
