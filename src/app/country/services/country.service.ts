import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, catchError, throwError, delay } from 'rxjs';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map(restCountries => CountryMapper.toCountries(restCountries)),
        catchError(err => {
          return throwError(() => new Error(`There is not a capital with that query ${query}`));
        })
      );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        map(restCountries => CountryMapper.toCountries(restCountries)),
        delay(1500), // Simulate network delay
        catchError(err => {
          return throwError(() => new Error(`There is not a country with that query ${query}`));
        })
      );
  }

  searchByCountryByAlphaCode(code: string): Observable<Country | undefined> {
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
      .pipe(
        map(restCountries => CountryMapper.toCountries(restCountries)),
        map(countries => countries.at(0)), // Get the first country from the array
        delay(1000), // Simulate network delay
        catchError(err => {
          return throwError(() => new Error(`There is not a country with that query ${code}`));
        })
      );
  }
}
