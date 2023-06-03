import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteDialogComponent } from 'app/delete-dialog/delete-dialog.component';
import { EventListComponent } from 'app/event-list/event-list.component';
import { EventApi } from 'app/models/EventApi';
import { RemoteEventApiService } from 'app/services/remote-event-api.service';
import { UserApiService } from 'app/services/user-api.service';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
  animations: [
    trigger('heartAnimation', [
        state('empty', style({
          fill: 'transparent',
          stroke: 'red',
        })),
        state('filled', style({
          fill: 'red',
          stroke: 'none',
        })),
        transition('empty => filled', animate('200ms ease-in')),
        transition('filled => empty', animate('200ms ease-out'))
      ])
]

})
export class EventDetailComponent implements OnInit {

    //API Data
    event?: EventApi;
    notFound: boolean = false;

    //Timezones
    timezoneAbreviation: string = '';
    usertimezoneAbreviation: string = '';

    //Event local date
    localhour: string= '';
    localday: string = '';
    localdayname: string = '';
    localmonth: string = '';
    localyear: string = '';

    //User local date
    userhour: string = '';
    userday: string = '';
    userdayname: string = '';
    usermonth: string = '';
    useryear: string = '';

    //URL For map
    url = 'https://www.google.com/maps/embed/v1/place?key=';
    private key = 'AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8';
    trusturl!: SafeResourceUrl;
    mapLine: string = '';

    //Currency
    selected: string = 'US Dollar';
    currenciesNames: string[] = ['US Dollar'];
    currenciesValues: number[] = [1];
    lowestPrice: string = '-';
    highestPrice: string = '-';
    averagePrice: string = '-';

    //Arrays for day/months names
    private days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    private months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    userId?: number;
    userEvents: EventApi[] = [];
    isLiked = false;
    showDialog: boolean = false;
    id: string = '';

    constructor(private router: Router, private eventapi: RemoteEventApiService, private route: ActivatedRoute,
        private sanitizer: DomSanitizer, private userApi: UserApiService, private dialog: MatDialog, ) {}

    ngOnInit(): void {

        const sessionData = localStorage.getItem('mySession');
        let sessiondata = sessionData ? JSON.parse(sessionData) : null;
        if(sessiondata != null){
        this.userId = sessiondata.userid;
        this.userApi.getUser(this.userId!).subscribe((data: any) => {
            if(data.event != null || data.event != undefined){
                this.userEvents = data.event;
                let item = data.event.find((e: EventApi) => e.apiEventId == parseInt(this.id));
                this.isLiked = this.userEvents.includes(item);
            }
        });
        }

        const id = String(this.route.snapshot.paramMap.get('id'));
        this.id = id;
        this.eventapi.getEvent(id).subscribe((data: any) => {
            if((data == null ||  data == undefined) && this.userId != null){
                this.userApi.getEventById(id, this.userId).subscribe((data: any) => {
                    if(data == null || data == undefined){
                        this.notFound = true;
                    }else{
                    this.event = data;
                    this.dataImprovement();
                    }

                });

            }else{
                let classification: string[] = [];
                for(let i = 0; i < data.taxonomies; i++){
                    classification.push(data.taxonomies[i].name);
                }
                this.event = {
                    apiEventId: data.id,
                    name: data.title,
                    image: data.performers[0].image,
                    type: data.type,
                    datetime_utc : data.datetime_utc,
                    datetime_local : data.datetime_local,
                    localtimezone : data.venue.timezone,
                    classification: classification,
                    price : {
                        lowestPrice: data.stats.lowest_price ?? data.stats.lowest_price,
                        highestPrice: data.stats.highest_price ?? data.stats.highest_price,
                        averagePrice: data.stats.average_price ?? data.stats.average_price,
                        listingCount: data.stats.listing_count ?? data.stats.listing_count
                    },
                    venue :{
                        name: data.venue.name,
                        city: data.venue.city,
                        state: data.venue.state,
                        country: data.venue.country,
                        address: data.venue.extended_address,
                        location: {
                            lat: data.venue.location.lat,
                            lon: data.venue.location.lon
                        }
                    }
                }
                this.dataImprovement();
            }
        });
         for(let k of EventListComponent.currency){
            this.currenciesNames.push(k[0]);
            this.currenciesValues.push(k[1]);
         }
    }
    dataImprovement() {
        this.getFixedTimeFromAPI();
        this.getLocalDateFixed(new Date(this.event!.datetime_local));
        this.getUserDateFixed(new Date(this.event!.datetime_utc));
        this.getTypeFixed()

        this.url = this.url.concat(this.key +'&q=' + this.event!.venue.location.lat + ',' + this.event!.venue.location.lon);
        this.trusturl= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);

        this.event!.price.lowestPrice == 0 ? this.lowestPrice = '-' : this.lowestPrice = String(this.event!.price.lowestPrice);
        this.event!.price.highestPrice == 0 ? this.highestPrice = '-' : this.highestPrice = String(this.event!.price.highestPrice);
        this.event!.price.averagePrice == 0 ? this.averagePrice = '-' : this.averagePrice = String(this.event!.price.averagePrice);

        this.mapLine = this.getMultilineTooltip();
    }



    getFixedTimeFromAPI() {
        this.timezoneAbreviation = moment().tz(this.event!.localtimezone).zoneAbbr();
        let aux = this.event!.datetime_local.split('T');
        let userzone= Intl.DateTimeFormat().resolvedOptions().timeZone;
        let useroffset = moment().tz(userzone).utcOffset();
        this.usertimezoneAbreviation = moment().tz(userzone).zoneAbbr();
        this.userhour = moment(this.event!.datetime_utc).add(useroffset,'minutes').format('HH:mm:ss');
        this.localhour = aux[1];
    }

    getTypeFixed() {
        if(this.event!.type.indexOf('_') != -1){
            let typeSplit = this.event!.type.split('_');
            this.event!.type = typeSplit[0].charAt(0).toUpperCase() + typeSplit[0].slice(1) + ' ' + typeSplit[1].charAt(0).toUpperCase() + typeSplit[1].slice(1);
            }else{
                this.event!.type = this.event!.type.charAt(0).toUpperCase() + this.event!.type.slice(1);
            }
    }

    getLocalDateFixed(localDate: Date) {
            this.localday = this.event!.datetime_local.charAt(8) + this.event!.datetime_local.charAt(9);
            this.localmonth = this.months[localDate.getMonth()];
            this.localyear = localDate.getFullYear().toString();
            this.localdayname = this.days[localDate.getDay()];

    }

     getUserDateFixed(userDate: Date) {
        this.userday = this.event!.datetime_local.charAt(8) + this.event!.datetime_local.charAt(9);
        this.usermonth = this.months[userDate.getMonth()];
        this.useryear = userDate.getFullYear().toString();
        this.userdayname = this.days[userDate.getDay()];
    }

    getTagFixed(genre: string): string {
        let result = '';
        if(genre.indexOf('_') != -1){
            let genreSplit = genre.split('_');
            for(let word in genreSplit){
                result += genreSplit[word].charAt(0).toUpperCase() + genreSplit[word].slice(1) + ' ';
            }
         }else{
                result= genre.charAt(0).toUpperCase() + genre.slice(1);
        }
        return result;
    }

    getMultilineTooltip(): string {
        return this.event!.venue.name + '\n' + this.event!.venue.address+ '\n' + this.event!.venue.country;;
    }

    changeCurrency(event: any){
        let index = this.currenciesNames.indexOf(event.value);
        let value = this.currenciesValues[index];
        if(this.lowestPrice != '-'){
            this.lowestPrice = (this.event!.price.lowestPrice * value).toFixed(2);
        }
        if(this.highestPrice != '-'){
            this.highestPrice = (this.event!.price.highestPrice * value).toFixed(2);
        }
        if(this.averagePrice != '-'){
            this.averagePrice = (this.event!.price.averagePrice * value).toFixed(2);
        }
    }

    toggleLike() {
        if(this.userId != undefined){
            this.isLiked = !this.isLiked;
            let event = this.event!;

            if(this.isLiked){
                this.userEvents.push(event);
            }else{
                let index = this.userEvents.findIndex(x => x.apiEventId == event.apiEventId);
                console.log(index);
                this.userEvents.splice(index,1);
            }
            this.userApi.updateEvents(this.userId,this.userEvents).subscribe((data: any) => {
        });
        }else{
            const dialogRef = this.dialog.open(DeleteDialogComponent, {
                autoFocus: false,
            });
            dialogRef.afterClosed().subscribe((confirm) => {
                if (confirm) {
                    this.router.navigate(['/sign-up']);
                }
            });


            //POPUP LOGIN

        }

    }


}
