import { Injectable } from '@angular/core';
import { DeckApiService } from './deck-api.service';
import { Observable, of } from 'rxjs';
import { Deck } from '../models/Deck';

@Injectable()
export class MockDeckApiService implements DeckApiService {
  getDecks(): Observable<Deck[]> {
    return of([
      {
        id: 12,
        name: 'Dr. Nice',
        cards: ['Video game', 'Airplane', 'Alien', 'Axe', 'Baby'],
        wins: Math.floor(Math.random() * 50),
        loses: Math.floor(Math.random() * 50),
        draws: Math.floor(Math.random() * 50),
      },
      {
        id: 13,
        name: 'Bombasto',
        cards: ['Laser', 'Law', 'Video game', 'Man', 'Math'],
        wins: Math.floor(Math.random() * 50),
        loses: Math.floor(Math.random() * 50),
        draws: Math.floor(Math.random() * 50),
      },
      {
        id: 14,
        name: 'Celeritas',
        cards: ['Cup', 'Death', 'Devil', 'Diamond', 'Dragon'],
        wins: Math.floor(Math.random() * 50),
        loses: Math.floor(Math.random() * 50),
        draws: Math.floor(Math.random() * 50),
      },
      {
        id: 15,
        name: 'Magneta',
        cards: ['Laser', 'Law', 'Lightning', 'Man', 'Math'],
        wins: Math.floor(Math.random() * 50),
        loses: Math.floor(Math.random() * 50),
        draws: Math.floor(Math.random() * 50),
      },
      {
        id: 18,
        name: 'Dr. IQ',
        cards: ['Satan', 'School', 'Scissors', 'Sky', 'Snake'],
        wins: Math.floor(Math.random() * 50),
        loses: Math.floor(Math.random() * 50),
        draws: Math.floor(Math.random() * 50),
      },
      {
        id: 19,
        name: 'Magma',
        cards: ['Sponge', 'Sun', 'Sword', 'T.V.', 'Tank'],
        wins: Math.floor(Math.random() * 50),
        loses: Math.floor(Math.random() * 50),
        draws: Math.floor(Math.random() * 50),
      },
      {
        id: 20,
        name: 'Tornado',
        cards: ['Wall', 'Water', 'Whip', 'Wolf', 'Woman'],
        wins: Math.floor(Math.random() * 50),
        loses: Math.floor(Math.random() * 50),
        draws: Math.floor(Math.random() * 50),
      },
    ]);
  }

  getDeck(id: number): Observable<Deck> {
    return of(
      [
        {
          id: 12,
          name: 'Dr. Nice',
          cards: ['Video game', 'Airplane', 'Alien', 'Axe', 'Baby'],
          wins: Math.floor(Math.random() * 50),
          loses: Math.floor(Math.random() * 50),
          draws: Math.floor(Math.random() * 50),
        },
        {
          id: 13,
          name: 'Bombasto',
          cards: ['Laser', 'Law', 'Video game', 'Man', 'Math'],
          wins: Math.floor(Math.random() * 50),
          loses: Math.floor(Math.random() * 50),
          draws: Math.floor(Math.random() * 50),
        },
        {
          id: 14,
          name: 'Celeritas',
          cards: ['Cup', 'Death', 'Devil', 'Diamond', 'Dragon'],
          wins: Math.floor(Math.random() * 50),
          loses: Math.floor(Math.random() * 50),
          draws: Math.floor(Math.random() * 50),
        },
        {
          id: 15,
          name: 'Magneta',
          cards: ['Laser', 'Law', 'Lightning', 'Man', 'Math'],
          wins: Math.floor(Math.random() * 50),
          loses: Math.floor(Math.random() * 50),
          draws: Math.floor(Math.random() * 50),
        },
        {
          id: 18,
          name: 'Dr. IQ',
          cards: ['Satan', 'School', 'Scissors', 'Sky', 'Snake'],
          wins: Math.floor(Math.random() * 50),
          loses: Math.floor(Math.random() * 50),
          draws: Math.floor(Math.random() * 50),
        },
        {
          id: 19,
          name: 'Magma',
          cards: ['Sponge', 'Sun', 'Sword', 'T.V.', 'Tank'],
          wins: Math.floor(Math.random() * 50),
          loses: Math.floor(Math.random() * 50),
          draws: Math.floor(Math.random() * 50),
        },
        {
          id: 20,
          name: 'Tornado',
          cards: ['Wall', 'Water', 'Whip', 'Wolf', 'Woman'],
          wins: Math.floor(Math.random() * 50),
          loses: Math.floor(Math.random() * 50),
          draws: Math.floor(Math.random() * 50),
        },
      ].find((x) => x.id == parseInt(String(id)))!
    );
  }

  updateDeck(id: number, deck: Deck): Observable<any> {
    return of();
  }

  addDeck(deck: Deck): Observable<Deck> {
    return of(deck);
  }

  deleteDeck(id: number): Observable<Deck> {
    return this.getDeck(id);
  }
}
