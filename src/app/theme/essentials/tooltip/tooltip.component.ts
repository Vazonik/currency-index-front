import { Component, Input } from '@angular/core';

@Component({
  selector: 'ci-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {
  @Input()
  text = '';

  public xPos = 0;
  public yPos = 0;

  public onMouseMove(e: MouseEvent) {
    this.xPos = e.pageX;
    this.yPos = e.pageY;
  }
}
