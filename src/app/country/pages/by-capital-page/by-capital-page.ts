import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { catchError, firstValueFrom, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {
  countryService = inject(CountryService);
  errorMessage = signal('');

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal(() => this.queryParam);

  // Using oservables
  capitalResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params: { query } }) => query ? this.countryService.searchByCapital(query).pipe(
      tap(() => {
        this.errorMessage.update(() => '');
        this.router.navigate(['/country/by-capital'], {
          queryParams: {
            query,
          }
        });
      }), // Clear previous error message on new search
      catchError(err => {
        console.log('Error: ', err.message);
        this.errorMessage.update(() => err.message); // Update error message signal with the error message
        return of([]);
      })
    ) : of([]),
  })

  // Using promises
  /* capitalResource = resource({
    params: () => ({ query: this.query() }),
    loader: async ({ params }) => {

      if (!params.query) return [];
      return await firstValueFrom(this.countryService.searchByCapital(params.query));
    }
  }) */

  /* isLoading = signal(false);
  isError = signal<string | null>(null);
  countries = signal<Country[]>([]);

  onSearch(query: string): void {

    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.isError.set(null);

    this.countryService.searchByCapital(query).subscribe({
      next: (countries) => {
        this.isLoading.set(false);
        this.countries.set(countries);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.countries.set([]);
        this.isError.set(err);
      }
    });
  } */
}
