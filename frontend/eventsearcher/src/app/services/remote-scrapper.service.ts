import { Injectable } from '@angular/core';
import { ScrapperService } from './scrapper.service';
import { RemoteApiService } from './remote-api.service';
import { Currency } from 'app/models/Currency';

@Injectable({
  providedIn: 'root'
})
export class RemoteScrapperService implements ScrapperService {

    private scraperUrl: string = 'http://localhost:8081/api/currency';

    constructor(private remoteApi: RemoteApiService) { }

    public getCurrency() {
        return this.remoteApi.get<Currency>(`${this.scraperUrl}/data`);
    }
}
