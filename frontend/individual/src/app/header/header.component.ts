import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EventListComponent } from 'app/event-list/event-list.component';
import { EventComponent } from 'app/event/event.component';
import { SessionService } from 'app/services/session.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  register: boolean = true;
  @Input() eventlist?: EventListComponent;
  autocompleteControl = new FormControl('');
  filteredEvents: EventComponent[] = [];
  filterProperty: string = 'name';
  @Input() control = new FormControl('');
  username: string = '';

  sessionData: any;
  private sessionSubscription: Subscription = new Subscription;

    constructor(private sessionService: SessionService, private router: Router) {}

    ngOnInit(): void {
        if(localStorage.length != 0){
            const sessionData = localStorage.getItem('mySession');
             this.sessionData = sessionData ? JSON.parse(sessionData) : null;
             this.username = this.sessionData.username;
        }else {
            this.register = false;
        }
        this.sessionSubscription = this.sessionService.getSessionDataObservable().subscribe((data) => {
            this.sessionData = data;
            if(this.sessionData != null){
                this.username= this.sessionData.username;
                this.register = true;
            }else{
                this.username = '';
                this.register = false;
            }
          });



    }

    ngOnDestroy(): void {
        this.sessionSubscription.unsubscribe();
    }

    logout() {
        this.sessionService.clearSession();
        this.router.navigateByUrl('/');
    }


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
