import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RemoteApiService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url).pipe(catchError(this.handleError<T>()));
  }

  post<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(url, data).pipe(catchError(this.handleError<T>()));
  }

  put<T>(url: string, data: any): Observable<T> {
    return this.http.put<T>(url, data).pipe(catchError(this.handleError<T>()));
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url).pipe(catchError(this.handleError<T>()));
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
