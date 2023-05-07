import { Injectable } from '@angular/core';
import { Deck } from '../models/Deck';
import { CardApiService } from './card-api.service';
import { lastValueFrom, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RandomDeckService {
  constructor(private cardApi: CardApiService) {}

  getRandomDeck(): Observable<Deck> {
    return this.cardApi.getCards().pipe(map((cards) => this.buildDeck(cards)));
  }

  private buildDeck(cards: string[]): Deck {
    let selectedCards: string[] = [];

    for (let i = 0; i < 5; i++) {
      const random = this.getRandom101(i);
      selectedCards[i] = cards[random];
      cards.splice(random, 1);
    }

    return {
      id: -1,
      name: 'Random',
      cards: selectedCards,
      wins: 0,
      loses: 0,
      draws: 0,
    };
  }

  private getRandom101(index: number): number {
    return Math.floor(Math.random() * (101 - index));
  }
}
