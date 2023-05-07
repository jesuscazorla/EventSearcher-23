import { Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { EventClassificationComponent } from 'app/event-classification/event-classification.component';
import { EventpriceComponent } from 'app/eventprice/eventprice.component';
import * as moment from 'moment-timezone';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
    @Input() name: string = '';
    @Input() id: string = '';
    @Input() image: string = '';
    @Input() datetime_utc: string = '';
    @Input() datetime_local: string = '';
    @Input() localtimezone: string = '';
    @Input() classification: EventClassificationComponent[] = [];
    @Input() price: EventpriceComponent= new EventpriceComponent();
    @Input() type: string = '';

    timezoneAbreviation: string = '';
    usertimezoneAbreviation: string = '';
    localhour: string= '';
    userhour: string = '';
    showLowestPrice: boolean = true;

    displayedColumns: string[] = ['Lowest Price', 'Average Price', 'Highest Price'];
    constructor() { }

    ngOnInit(): void {
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
        if(this.price.lowest_price == undefined){
            this.showLowestPrice = false;
        }else{
            this.showLowestPrice = true;
        }





    }




}
