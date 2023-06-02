import { Observable } from 'rxjs';
import { Currency } from '../models/Currency';
export abstract class ScrapperService {

    public abstract getCurrency(): Observable<Currency>;
}
