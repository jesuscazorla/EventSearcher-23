import { Injectable } from '@angular/core';
import { EventComponent } from 'app/event/event.component';
import { Observable, of } from 'rxjs';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class MockeventapiService {

  constructor() {}

  getEvents(): Observable<any> {
    return of([
      {
        name: 'West Conf Semis Game 4: Nuggets at Suns',
        id: 'G5v0Z9JD6ndYG',
        images : {
            url : 'https://s1.ticketm.net/dam/a/1d0/1d0f1d2c-1f7e-4b7e-9e1e-9b9b0f4b51d0_133501_EVENT_DETAIL_PAGE_16_9.jpg',
            width : 305,
            height : 225
        },
        startDate : '2023-05-07',
        localtime : '17:00:00',
        timezone : 'America/Phoenix',
        classification : {
            primary : 'Sports',
            genre : 'Basketball',
            subGenre : 'NBA'
        },
        price : {
            currency : 'USD',
            min : 139.0,
            max : 6750.0
      }
    },
])
}}
