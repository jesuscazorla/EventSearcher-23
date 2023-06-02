import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
    private readonly SESSION_KEY = 'mySession';
    private sessionData: any;
    private sessionDataSubject = new Subject<any>();

    setSession(sessionData: any): void {
      this.sessionData = sessionData;
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
      this.sessionDataSubject.next(sessionData);
    }

    getSession(): any {
      if (!this.sessionData) {
        const sessionData = localStorage.getItem(this.SESSION_KEY);
        this.sessionData = sessionData ? JSON.parse(sessionData) : null;
      }
      return this.sessionData;
    }

    clearSession(): void {
      this.sessionData = null;
      localStorage.removeItem(this.SESSION_KEY);
      this.sessionDataSubject.next(null);
    }

    getSessionDataObservable(): Observable<any> {
      return this.sessionDataSubject.asObservable();
    }
}
