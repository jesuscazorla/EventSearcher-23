import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { EventComponent } from 'app/event/event.component';
import { EventService } from 'app/services/event.service';
import { MockeventapiService } from 'app/services/mockeventapi.service';
import { RemoteEventApiService } from 'app/services/remote-event-api.service';

@Component({
  selector: 'app-navigationbar',
  templateUrl: './navigationbar.component.html',
  styleUrls: ['./navigationbar.component.scss']
})
export class NavigationbarComponent implements OnInit {

    eventPage: any = [];
    eventsInPage: EventComponent[]  = [];
    attractions: [] = [];
    venues: [] = [];
    @Input() page: string = '1';

    constructor(private eventapi: RemoteEventApiService){}

    ngOnInit(): void {
        this.eventapi.getEvents().subscribe((eventPage) =>{
            this.eventPage = eventPage;
        });

       this.showPage();
    }

    changePage(pageEvent: PageEvent){
        var index = pageEvent.pageIndex;
        this.page = (index+1).toString();
        this.showPage();
    }
    showPage(){
        this.eventapi.getEventsPage(this.page).subscribe((eventsInPage) =>{
            this.eventsInPage = eventsInPage;
        });
    }
}
