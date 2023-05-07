import { Observable } from 'rxjs';
import { Deck } from '../models/Deck';

export abstract class DeckApiService {
  public abstract getDecks(): Observable<Deck[]>;

  public abstract getDeck(id: number): Observable<Deck>;

  public abstract updateDeck(id: number, deck: Deck): Observable<any>;

  public abstract addDeck(deck: Deck): Observable<Deck>;

  public abstract deleteDeck(id: number): Observable<Deck>;
}
