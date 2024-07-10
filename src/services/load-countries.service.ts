import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Country {
  name: {
    common: string;
  };
  cca3: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoadCountriesService {

  private readonly url = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient) {}

  getData(): Observable<Country[]> {
    return this.http.get<Country[]>(this.url);
  }
}
