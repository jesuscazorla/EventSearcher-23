import {Component, ViewChild} from '@angular/core';
import { EventListComponent } from './event-list/event-list.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    @ViewChild(EventListComponent) eventList!: EventListComponent;


}
