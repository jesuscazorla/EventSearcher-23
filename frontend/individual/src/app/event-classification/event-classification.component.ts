import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event-classification',
  templateUrl: './event-classification.component.html',
  styleUrls: ['./event-classification.component.scss']
})
export class EventClassificationComponent {
    @Input() genre: string[] = [];

}
