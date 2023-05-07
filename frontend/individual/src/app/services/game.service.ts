import { Injectable, EventEmitter } from '@angular/core';
import { Deck } from '../models/Deck';
import { GameMode } from '../models/GameMode';
import { GameParameters } from '../models/GameParameters';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  private scrapUrl = 'http://localhost:8081/api/bot/data';
  public StartGameEvent = new EventEmitter<GameParameters>();
  public EndGameEvent = new EventEmitter();

  private isGameOn: boolean = false;

  constructor(private http: HttpClient) {}

  public startGame(gamemode: GameMode, deck: Deck) {
    if (this.isGameOn) return;
    const parameters: GameParameters = { gamemode: gamemode, deck: deck };
    this.isGameOn = true;
    this.StartGameEvent.emit(parameters);
  }

  public endGame(shouldWarnUser: boolean = false) {
    if (!this.isGameOn) return;

    if (shouldWarnUser) {
      const confirmation = window.confirm(
        'Are you sure you want to end the game?'
      );
      if (!confirmation) return;
    }

    this.isGameOn = false;
    this.EndGameEvent.emit();
  }
  getBot(): Observable<any> {
    return this.http.get<any>(this.scrapUrl).pipe(
        map(bot => bot)
    )
  }
}
