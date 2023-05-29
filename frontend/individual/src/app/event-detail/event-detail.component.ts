import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventClassificationComponent } from 'app/event-classification/event-classification.component';
import { EventpriceComponent } from 'app/eventprice/eventprice.component';
import { RemoteEventApiService } from 'app/services/remote-event-api.service';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
    datetime_utc: string = '';
    datetime_local: string = '';
    localtimezone: string = '';
    classification: EventClassificationComponent = new EventClassificationComponent();
    performers: any[] = [];
    type: string = '';
    name: string = '';
    id: string = '';
    image: string = '';
    price: EventpriceComponent= new EventpriceComponent();
    timezoneAbreviation: string = '';
    usertimezoneAbreviation: string = '';

    localhour: string= '';
    localday: string = '';
    localdayname: string = '';
    localmonth: string = '';
    localyear: string = '';

    userhour: string = '';
    userday: string = '';
    userdayname: string = '';
    usermonth: string = '';
    useryear: string = '';

    private days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    private months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


    constructor(private router: Router, private eventapi: RemoteEventApiService, private route: ActivatedRoute) { }

    ngOnInit(): void {

        const id = String(this.route.snapshot.paramMap.get('id'));
        this.eventapi.getEvent(id).subscribe((data: any) => {
            this.id = data.id;
            this.name = data.title;
            this.image = data.performers[0].image;
            this.type = data.type;
            this.datetime_utc = data.datetime_utc;
            this.datetime_local = data.datetime_local;
            this.localtimezone = data.venue.timezone;


            this.price = {
                lowest_price: (data.stats.lowest_price == undefined) ? '-' : data.stats.lowest_price,
                highest_price: (data.stats.highest_price == undefined) ? '-' : data.stats.highest_price,
                average_price: (data.stats.average_price == undefined) ? '-' : data.stats.average_price,
                listing_count: (data.stats.listing_count == undefined) ? 0 : data.stats.listing_count
            }
            this.performers = data.performers;

            this.getFixedTimeFromAPI();
            this.getLocalDateFixed(new Date(this.datetime_local));
            this.getUserDateFixed(new Date(this.datetime_utc));
            this.getTypeFixed()
            this.getClassifications(this.performers);

        });


    }
    getFixedTimeFromAPI() {
        this.timezoneAbreviation = moment().tz(this.localtimezone).zoneAbbr();
        var aux = this.datetime_local.split('T');
        var userzone= Intl.DateTimeFormat().resolvedOptions().timeZone;
        var useroffset = moment().tz(userzone).utcOffset();
        this.usertimezoneAbreviation = moment().tz(userzone).zoneAbbr();
        var xd = this.datetime_utc;
        var aux2 = this.datetime_utc.split('T');
        this.datetime_utc = aux2[0];
        this.userhour = moment(xd).add(useroffset,'minutes').format('HH:mm:ss');
        this.datetime_local = aux[0];
        this.localhour = aux[1];
    }
    getClassifications(performers: any[]) {
        for (let k in this.performers){
            if (this.performers[k].taxonomies != undefined){
                for (let j in this.performers[k].taxonomies){
                    var genre = this.performers[k].taxonomies[j].name;
                    if(genre.indexOf('_') != -1){
                        var genreSplit = genre.split('_');
                        genre = genreSplit[0].charAt(0).toUpperCase() + genreSplit[0].slice(1) + ' ' + genreSplit[1].charAt(0).toUpperCase() + genreSplit[1].slice(1);
                        }else{
                            genre= genre.charAt(0).toUpperCase() + genre.slice(1);
                        }
                    if(!this.classification.genre.includes(genre)){

                    this.classification.genre.push(genre);
                    }
                }
            }

        }
    }
    getTypeFixed() {
        if(this.type.indexOf('_') != -1){
            var typeSplit = this.type.split('_');
            this.type = typeSplit[0].charAt(0).toUpperCase() + typeSplit[0].slice(1) + ' ' + typeSplit[1].charAt(0).toUpperCase() + typeSplit[1].slice(1);
            }else{
                this.type = this.type.charAt(0).toUpperCase() + this.type.slice(1);
            }
    }

    getLocalDateFixed(localDate: Date) {
            this.localday = this.datetime_local.charAt(8) + this.datetime_local.charAt(9);
            this.localmonth = this.months[localDate.getMonth()];
            this.localyear = localDate.getFullYear().toString();
            this.localdayname = this.days[localDate.getDay()];

    }

     getUserDateFixed(userDate: Date) {
        this.userday = this.datetime_local.charAt(8) + this.datetime_local.charAt(9);
        this.usermonth = this.months[userDate.getMonth()];
        this.useryear = userDate.getFullYear().toString();
        this.userdayname = this.days[userDate.getDay()];
    }


}

