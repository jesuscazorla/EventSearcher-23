import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EventListComponent } from 'app/event-list/event-list.component';
import { EventComponent } from 'app/event/event.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  register: boolean = true;
  @Input() eventlist?: EventListComponent;
  autocompleteControl = new FormControl('');
  filteredEvents: EventComponent[] = [];
  filterProperty: string = 'name';
  @Input() control = new FormControl('');



  getFiltered(filtered: EventComponent[]) {
    this.filteredEvents = filtered;
  }

  search(): void {
    if(this.control.value != undefined){
       this.eventlist!.searchEvents(this.control.value);
    }
}
  reload(){
    this.eventlist!.reload();

  }

}
