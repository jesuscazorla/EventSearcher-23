import { Injectable } from '@angular/core';
import {EventService} from './event.service';
import { RemoteApiService } from './remote-api.service';
import { EventComponent } from 'app/event/event.component';
import { Observable, map } from 'rxjs';
import { EventDetailComponent } from 'app/event-detail/event-detail.component';

@Injectable(
    {providedIn: 'root'}
)
export class RemoteEventApiService implements EventService {

    constructor(private remoteapi: RemoteApiService) { }
    private seatgeekURL= 'https://api.seatgeek.com/2/';
    private clientid= 'MzM0NDcxNzF8MTY4MzIwMDcwNi4xMjA4MTU4';

    getEvents(): Observable<any> {
        return this.remoteapi.get<any>(`${this.seatgeekURL}/events?client_id=${this.clientid}&per_page=15`).pipe(
            map(data => data.meta));
    }

    getEvent(id: string): Observable<any>{
        return this.remoteapi.get<any>(`${this.seatgeekURL}/events/${id}?client_id=${this.clientid}`).pipe(
            map(data => {return data;}));

        }

    searchEventPage(event : string, page: string): Observable<EventComponent[]>{
        return this.remoteapi.get<any>(`${this.seatgeekURL}/events?client_id=${this.clientid}&q=${event}&per_page=15&page=${page}`).pipe(
            map(data => data.events.map((event: any) => {
                return {
                    id: event.id,
                    name: event.title,
                    image: event.performers[0].image,
                    price: {
                        average_price: event.stats.lowest_price,
                    }
                   }
                })
                ));
        }
    searchEvent(event: string): Observable<EventComponent[]> {
        return this.remoteapi.get<any>(`${this.seatgeekURL}/events?client_id=${this.clientid}&q=${event}&per_page=15`).pipe(
            map(data => data.meta));
    }

    getEventsPage(page: string) : Observable<any>{
        return this.remoteapi.get<any>(`${this.seatgeekURL}/events?client_id=${this.clientid}&page=${page}&per_page=15`).pipe(
            map(data => data.events.map((event: any) => {
                return {
                    id: event.id,
                    name: event.title,
                    image: event.performers[0].image,
                    price: {
                        lowest_price: event.stats.lowest_price,
                   }
                }
                })
                ));
        }
}

