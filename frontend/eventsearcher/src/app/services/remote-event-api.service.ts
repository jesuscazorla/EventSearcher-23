import { Injectable } from '@angular/core';
import {EventService} from './event.service';
import { RemoteApiService } from './remote-api.service';
import { EventComponent } from 'app/event/event.component';
import { Observable, map } from 'rxjs';
import { EventApi } from 'app/models/EventApi';

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

    getEvent(id: string): Observable<EventApi>{
        return this.remoteapi.get<any>(`${this.seatgeekURL}/events/${id}?client_id=${this.clientid}`).pipe(
            map(data => {
                let classification: string[] = [];
                for(let i = 0; i < data.taxonomies; i++){
                    classification.push(data.taxonomies[i].name);
                }
                return {
                    apiEventId: data.id,
                    name: data.title,
                    image: data.performers[0].image,
                    type: data.type,
                    datetime_utc : data.datetime_utc,
                    datetime_local : data.datetime_local,
                    localtimezone : data.venue.timezone,
                    classification: classification,
                    price : {
                        lowestPrice: (data.stats.lowest_price == undefined) ? 0 : data.stats.lowest_price,
                        highestPrice: (data.stats.highest_price == undefined) ? 0 : data.stats.highest_price,
                        averagePrice: (data.stats.average_price == undefined) ? 0 : data.stats.average_price,
                        listingCount: (data.stats.listing_count == undefined) ? 0 : data.stats.listing_count
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
            })
        );


        }

    searchEventPage(event : string, page: string): Observable<EventComponent[]>{
        return this.remoteapi.get<any>(`${this.seatgeekURL}/events?client_id=${this.clientid}&q=${event}&per_page=15&page=${page}`).pipe(
            map(data => data.events.map((event: any) => {
                return {
                    id: event.id,
                    name: event.title,
                    image: event.performers[0].image,
                    lowestPrice: event.stats.lowest_price,
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
                    lowestPrice: event.stats.lowest_price,

                }
                })
                ));
        }
}

