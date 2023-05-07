import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-num-circle',
  templateUrl: './num-circle.component.html',
  styleUrls: ['./num-circle.component.scss']
})
export class NumCircleComponent {
    @Input() number: number = 0;
    @Input() text: string = "";
}
