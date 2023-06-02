import {Component, ViewChild} from '@angular/core';
import { EventListComponent } from './event-list/event-list.component';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    @ViewChild(EventListComponent) eventList!: EventListComponent;

    hideBack: boolean = true;
    constructor(private location: Location, private router: Router, private activatedRoute: ActivatedRoute){
        router.events.subscribe((val) => {
            if(router.url == '/'){
                this.hideBack = true;
            }else{
                this.hideBack = false;
            }

        });

    }


    goBack(){
        this.location.back();
    }
}
