import { Component,OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { NavigationEnd, Router } from '@angular/router';
import { EventComponent } from 'app/event/event.component';
import { RemoteEventApiService } from 'app/services/remote-event-api.service';
import { ScrapperService } from 'app/services/scrapper.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
    eventPage: any = [];
    eventsInPage: EventComponent[]  = [];
    page: string = '1';
    searchTerm: string = '';
    hideList: boolean = false;

    goHome: boolean = false;

    static currency: Map<string, number> = new Map<string, number>();

    constructor(private eventapi: RemoteEventApiService, private router: Router, private scraper: ScrapperService){
        router.events.subscribe((val) => {
            if (val instanceof NavigationEnd){
                if(val.url !== '/'){
                    this.hideList = true;
                }else{
                    this.hideList = false;
                }
            }
        });
    }
    ngOnInit(): void {
        this.eventapi.getEvents().subscribe((eventPage: any) =>{
            this.eventPage = eventPage;
        });
        this.searchTerm = '';
        this.page = '1';
        this.showPage();

        this.getCurrencyData();
    }

    getCurrencyData() {

        this.scraper.getCurrency().subscribe((data: any) => {
            var currency = data;
            for (let key in currency.currency) {
                EventListComponent.currency.set(key, currency.currency[key]);
            }
        });
    }


    changePage(pageEvent: PageEvent){
        var index = pageEvent.pageIndex;
        this.page = (index+1).toString();
        this.showPage();
    }

    showPage(){
        if(this.searchTerm.length === 0){
            this.eventapi.getEventsPage(this.page).subscribe((eventsInPage: EventComponent[]) =>{
                this.eventsInPage = eventsInPage;
        });
        }else{
            this.eventapi.searchEventPage(this.searchTerm, this.page).subscribe((eventsInPage: EventComponent[]) =>{
                this.eventsInPage = eventsInPage;
        });
    }
    }

     searchEvents(searchTerm: string){
        this.searchTerm = searchTerm;
        console.log(this.searchTerm);
        this.eventapi.searchEvent(searchTerm).subscribe((eventPage: any) =>{
            this.eventPage = eventPage;
        });
        this.page = '1';
        this.eventapi.searchEventPage(searchTerm, "1").subscribe((eventsInPage: EventComponent[]) =>{
            this.eventsInPage = eventsInPage;
        });

    }

     reload(){
        this.ngOnInit();
    }

    getPageIndex(): number{
        return parseInt(this.page)-1;
    }





}

