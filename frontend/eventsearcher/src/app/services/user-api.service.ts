import { Injectable } from '@angular/core';
import { RemoteApiService } from './remote-api.service';
import { Observable, map } from 'rxjs';
import { User } from 'app/models/User';
import { EventApi } from 'app/models/EventApi';

@Injectable({
  providedIn: 'root'
})
export class UserApiService{

    constructor(private remoteApi: RemoteApiService) { }

    private userURL="http://localhost:8081/api/users";

    getUser(userId: number): Observable<any> {
        return this.remoteApi.get<any>(`${this.userURL}/${userId}`);
    }

    getUserFromName(name: string): Observable<any>{
        return this.remoteApi.get<any>(`${this.userURL}/search/findByName?name=${name}`).pipe(
            map(data => data._embedded.users),
        );

    }
    getUserFromEmail(email: string): Observable<any>{
        return this.remoteApi.get<any>(`${this.userURL}/search/findByEmail?email=${email}`).pipe(
            map(data => data._embedded.users),
        );
    }

    getEventById(eventId: string, userId: number): Observable<any> {
        return this.remoteApi.get<any>(`${this.userURL}/${userId}/events`).pipe(
            map(data => data.find((event: any) => event.apiEventId == eventId)
            )
        );




    }

    createUser(user : User) {
        return this.remoteApi.post<any>(`${this.userURL}`, user);
    }

    updateEvents(userId: number, events: EventApi[]) {
        let user = {
            event: events
        }


        return this.remoteApi.patch(`${this.userURL}/${userId}`, user);

    }





}
