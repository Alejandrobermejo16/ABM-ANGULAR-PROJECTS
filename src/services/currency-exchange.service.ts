// src/app/services/currency-exchange.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangeService {
  private readonly exchangeApiUrl = environment.apiExchangeUrl;
  private readonly apiKey = environment.apiExchangeKey;

  constructor(private http: HttpClient) {}

  convertCurrency(amount: number, fromCurrency: string, toCurrency: string): Observable<number> {
    return this.http.get<any>(`${this.exchangeApiUrl}/${this.apiKey}/latest/${fromCurrency}`)
      .pipe(
        map(data => {
          const rate = data.conversion_rates[toCurrency];
          if (!rate) {
            throw new Error(`No se encontró una tasa de cambio para ${toCurrency}`);
          }
          return amount * rate;
        })
      );
  }
}
