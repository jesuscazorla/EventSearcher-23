import { Injectable } from '@angular/core';
import { DeckApiService } from './deck-api.service';
import { Observable, map } from 'rxjs';
import { Deck } from '../models/Deck';
import { RemoteApiService } from './remote-api.service';

@Injectable()
export class RemoteDeckApiService implements DeckApiService {
  constructor(private remoteApi: RemoteApiService) {}

  private decksUrl = 'http://localhost:8081/api/decks';

  getDecks(): Observable<Deck[]> {
    return this.remoteApi.get<any>(`${this.decksUrl}`).pipe(
      map((response) => {
        return response._embedded.decks;
      })
    );
  }

  getDeck(id: number): Observable<Deck> {
    return this.remoteApi.get<any>(`${this.decksUrl}/${id}`);
  }

  updateDeck(id: number, deck: Deck): Observable<any> {
    return this.remoteApi.put(this.decksUrl + `/${id}`, deck);
  }

  addDeck(deck: Deck): Observable<Deck> {
    return this.remoteApi.post<any>(this.decksUrl, deck);
  }

  deleteDeck(id: number): Observable<Deck> {
    return this.remoteApi.delete<any>(this.decksUrl + `/${id}`);
  }
}
