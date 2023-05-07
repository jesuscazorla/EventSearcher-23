import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-eventprice',
  templateUrl: './eventprice.component.html',
  styleUrls: ['./eventprice.component.scss']
})
export class EventpriceComponent {
    @Input() average_price: number = 0;
    @Input() lowest_price: number = 0;
    @Input() highest_price: number = 0;


}
