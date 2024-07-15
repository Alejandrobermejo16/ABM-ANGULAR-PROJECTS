// src/app/services/load-countries.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Country {
  name: {
    common: string;
  };
  cca3: string;
  flags: {
    png: string;  
  };
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class LoadCountriesService {
  private readonly url = 'https://restcountries.com/v3.1/all';
  private readonly urlAlpha = 'https://restcountries.com/v3.1/alpha';

  constructor(private http: HttpClient) {}

  getData(): Observable<Country[]> {
    return this.http.get<Country[]>(this.url);
  }

  getCurrencyCode(countryCode: string): Observable<string> {
    return this.http.get<Country>(`${this.urlAlpha}/${countryCode}`)
      .pipe(
        map(country => {
          return Object.keys(country.currencies)[0];
        })
      );
  }
}
