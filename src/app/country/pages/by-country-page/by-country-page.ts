import { Component, computed, inject, linkedSignal, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, firstValueFrom, map, of, pipe, tap } from 'rxjs';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'by-country-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage {
  countryService = inject(CountryService);
  errorMessage = signal('');

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal(() => this.queryParam);

  // Using oservables
  capitalResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params: { query } }) => query ? this.countryService.searchByCountry(query).pipe(
      tap(() => {
        this.errorMessage.update(() => '');
        this.router.navigate(['/country/by-country'], {
          queryParams: {
            query,
          }
        });
      }),
      catchError(err => {
        console.log('Error: ', err.message);
        this.errorMessage.update(() => err.message); // Update error message signal with the error message
        return of([]);
      })
    ) : of([]),
  })

  // Using promises
  /* countryResource = resource({
    params: () => ({ query: this.query() }),
    loader: async ({ params }) => {

      if (!params.query) return [];
      return await firstValueFrom(this.countryService.searchByCountry(params.query));
    }
  }) */
}
