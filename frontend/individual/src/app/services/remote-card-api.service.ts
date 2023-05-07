import { Injectable } from '@angular/core';
import { CardApiService } from './card-api.service';
import { RemoteApiService } from './remote-api.service';
import { Observable, map } from 'rxjs';
import { BattleOutcome } from '../models/BattleOutcome';
import { CardOutcomes, WinningOutcome } from '../models/CardOutcomes';

@Injectable()
export class RemoteCardApiService implements CardApiService {
  private rps101Url = 'https://rps101.pythonanywhere.com/api/v1';

  constructor(private remoteApi: RemoteApiService) {}

  getCards(): Observable<string[]> {
    return this.remoteApi.get<string[]>(`${this.rps101Url}/objects/all`);
  }

  getCardOutcomes(cardName: string): Observable<CardOutcomes> {
    return this.remoteApi
      .get<any>(`${this.rps101Url}/objects/${cardName}`)
      .pipe(
        map((response) => {
          const cardOutcomes: CardOutcomes = {
            card: response.object,
            winningOutcomes: response['winning outcomes'].map(
              (outcome: WinningOutcome[]) => ({
                outcome: outcome[0],
                losingCard: outcome[1],
              })
            ),
          };
          return cardOutcomes;
        })
      );
  }

  getBattleResult(card1: string, card2: string): Observable<BattleOutcome> {
    return this.remoteApi.get<BattleOutcome>(
      `${this.rps101Url}/match?object_one=${card1}&object_two=${card2}`
    );
  }
}
