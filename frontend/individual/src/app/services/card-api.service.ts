import { Observable } from 'rxjs';
import { BattleOutcome } from '../models/BattleOutcome';
import { CardOutcomes } from '../models/CardOutcomes';

export abstract class CardApiService {
  public abstract getCards(): Observable<string[]>;

  public abstract getCardOutcomes(cardName: string): Observable<CardOutcomes>;

  public abstract getBattleResult(
    card1: string,
    card2: string
  ): Observable<BattleOutcome>;
}
