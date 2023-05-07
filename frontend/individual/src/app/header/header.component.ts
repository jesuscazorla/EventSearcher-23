import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EventComponent } from 'app/event/event.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  register: boolean = true;

  autocompleteControl = new FormControl('');
  events: EventComponent[] = [];
  filteredEvents: EventComponent[] = [];
  filterProperty: string = 'name';

  getFiltered(filtered: EventComponent[]) {
    this.filteredEvents = filtered;
  }
}
