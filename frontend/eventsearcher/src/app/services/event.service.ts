import { Injectable } from '@angular/core';
import { EventComponent } from 'app/event/event.component';
import { Observable } from 'rxjs';


export abstract class EventService {

    public abstract getEvents(): Observable<EventComponent[]>;

  constructor() { }
}
