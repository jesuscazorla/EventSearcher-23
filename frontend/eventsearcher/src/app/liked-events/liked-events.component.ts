import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { EventComponent } from 'app/event/event.component';
import { UserApiService } from 'app/services/user-api.service';

@Component({
  selector: 'app-liked-events',
  templateUrl: './liked-events.component.html',
  styleUrls: ['./liked-events.component.scss']
})
export class LikedEventsComponent implements OnInit {

    likedEvents: EventComponent[] = [];
    userId: any;
    showEmpty: boolean = false;
    constructor(private router: Router, private route: ActivatedRoute, private userApi: UserApiService) {
    }
    numItems = 0;

    page?: string;
    eventsInPage: EventComponent[] = [];


    changePage(pageEvent: PageEvent): void {
        this.page = (pageEvent.pageIndex + 1).toString();
        this.showPage();
    }

    getPageIndex(): number {
       return this.page ? parseInt(this.page) - 1 : 0;
    }

    ngOnInit(): void {
        const sessionData = localStorage.getItem('mySession');
        let sessiondata = sessionData ? JSON.parse(sessionData) : null;
        this.userId = sessiondata.userid;

        this.userApi.getUser(this.userId).subscribe((data: any) => {
            if(data.event != null ){
            this.likedEvents = data.event;
            for(let i = 0; i < this.likedEvents.length; i++){
                this.likedEvents[i].id = data.event[i].apiEventId;
            }
            this.page = '1';
            this.showPage();
            this.numItems = this.likedEvents.length;
            }else{
                this.showEmpty = true;
            }
            if(this.likedEvents.length == 0){
                this.showEmpty = true;
            }
        });


    }

    showPage(): void {
        this.eventsInPage = [];
        let index = (parseInt(this.page!) - 1) * 15;
        for(let i = index; i < index + 15 && i < this.likedEvents.length; i++){
            this.eventsInPage.push(this.likedEvents[i]);
        }

    }

}
