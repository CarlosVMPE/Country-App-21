import { Component, inject, linkedSignal, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, of, tap } from 'rxjs';
import { CountryList } from '../../components/country-list/country-list';
import { regionOptions, Region, regions } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParams(queryParam: string): Region {
  queryParam = queryParam.toLowerCase();
  const validRegions: Record<string, Region> = {
    'africa': 'Africa',
    'americas': 'Americas',
    'asia': 'Asia',
    'europe': 'Europe',
    'oceania': 'Oceania',
    'antarctic': 'Antarctic'
  };

  return validRegions[queryParam] ?? 'Americas';
}

@Component({
  selector: 'by-region-page',
  imports: [CountryList, NgClass],
  templateUrl: './by-region-page.html',
})
export class ByRegionPage {
  regionsOptions = regionOptions;
  countryService = inject(CountryService);

  errorMessage = signal('');

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';

  region = linkedSignal<Region>(() => validateQueryParams(this.queryParam));

  regionResource = rxResource({
    params: () => ({ region: this.region() }),
    stream: ({ params: { region } }) => region ? this.countryService.searchCountryByRegion(region).pipe(
      tap(() => {
        this.errorMessage.update(() => '');
        this.router.navigate(['/country/by-region'], {
          queryParams: {
            region,
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

  selectRegion(region: Region) {
    this.region.set(region);
  }
}
