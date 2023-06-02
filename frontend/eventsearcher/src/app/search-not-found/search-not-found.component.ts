import { Component, Input } from '@angular/core';
import { EventListComponent } from 'app/event-list/event-list.component';

@Component({
  selector: 'app-search-not-found',
  templateUrl: './search-not-found.component.html',
  styleUrls: ['./search-not-found.component.scss']
})
export class SearchNotFoundComponent {
    @Input() eventList?: EventListComponent;

    goHome(){
        this.eventList?.ngOnInit();
    }




}
