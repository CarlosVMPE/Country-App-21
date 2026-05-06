import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { CountryMapper } from '../mappers/country.mapper';
import { Country, Region } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegions = new Map<string, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query)!);
    }

    console.log('Llegando al servidor ', query)

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map(restCountries => CountryMapper.toCountries(restCountries)),
        tap(countries => this.queryCacheCapital.set(query, countries)),
        catchError(err => {
          return throwError(() => new Error(`There is not a capital with that query ${query}`));
        })
      );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query)!);
    }

    console.log('Llegando al servidor ', query)

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        map(restCountries => CountryMapper.toCountries(restCountries)),
        tap(countries => this.queryCacheCountry.set(query, countries)),
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

  searchCountryByRegion(region: Region) {
    if (this.queryCacheRegions.has(region)) {
      return of(this.queryCacheRegions.get(region)!);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`)
      .pipe(
        map(restCountries => CountryMapper.toCountries(restCountries)),
        tap(countries => this.queryCacheRegions.set(region, countries)),
        catchError(err => {
          return throwError(() => new Error(`There is not countries with that query ${region}`));
        })
      )
  }
}
