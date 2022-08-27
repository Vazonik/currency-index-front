import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Currency from '../models/currency';
import { Observable, map } from 'rxjs';

@Injectable()
export default class CurrenciesService {
  constructor(private http: HttpClient) {}

  private static getApiUrl(currencyRef: string) {
    return `https://www.floatrates.com/daily/${currencyRef.toLowerCase()}.json`;
  }

  public getCurrencyRates(rateTo: string): Observable<Currency[]> {
    return this.http
      .get(CurrenciesService.getApiUrl(rateTo))
      .pipe(map((o) => Object.values(o)));
  }

  public getCurrencies(): Observable<Currency[]> {
    const usd: Currency = {
      code: 'USD',
      name: 'U.S. Dollar',
      rate: 1.0,
    };

    return this.http
      .get(CurrenciesService.getApiUrl('usd'))
      .pipe(map((o) => Object.values(o).concat(usd)));
  }
}
