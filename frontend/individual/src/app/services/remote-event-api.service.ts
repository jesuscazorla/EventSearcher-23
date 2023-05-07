import { Injectable } from '@angular/core';
import {EventService} from './event.service';
import { RemoteApiService } from './remote-api.service';
import { EventComponent } from 'app/event/event.component';
import { Observable, map } from 'rxjs';

@Injectable(
    {providedIn: 'root'}
)
export class RemoteEventApiService implements EventService {

    private ticketmasterURL = 'https://app.ticketmaster.com/discovery/v2/';
    private apiKey= "xJ3xfGcZGkFhGZW9vl5zz81DaqaKc3AQ";
    constructor(private remoteapi: RemoteApiService) { }
    private seatgeekURL= 'https://api.seatgeek.com/2/';
    private clientid= 'MzM0NDcxNzF8MTY4MzIwMDcwNi4xMjA4MTU4';

    //SEATGEEK API 74f700302e23cf5e503d2f1786dcb6ad31fb5aa03b0a3e896bcc9f1ba9099000

    getEvents(): Observable<any> {
        return this.remoteapi.get<any>(`${this.seatgeekURL}/events?client_id=${this.clientid}`).pipe(
            map(data => data.meta));
    }

    getEventsPage(page: string) : Observable<any>{
        return this.remoteapi.get<any>(`${this.seatgeekURL}/events?client_id=${this.clientid}&page=${page}`).pipe(
            map(data => data.events.map((event: any) => {
                return {
                    id: event.id,
                    type: event.type,
                    name: event.title,
                    image: event.performers[0].image,
                    datetime_utc : event.datetime_utc,
                    datetime_local: event.datetime_local,
                    localtimezone: event.venue.timezone,
                    classification: event.genres?
                    {
                        name: event.genres[0].name,

                    } : null,
                    price: {
                        average_price: event.stats.average_price,
                        lowest_price: event.stats.lowest_price,
                        highest_price: event.stats.highest_price

                    }
                   }
                })
                ));
        }
}

