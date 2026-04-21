import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { NotFound } from "../../../shared/components/not-found/not-found";
import { CountryInfo } from "./country-info/country-info";

@Component({
  selector: 'country-page',
  imports: [NotFound, CountryInfo],
  templateUrl: './country-page.html',
})
export class CountryPage {
  countryCode = inject(ActivatedRoute).snapshot.paramMap.get('code') ?? '';
  countryService = inject(CountryService);

  countryResource = rxResource({
    params: () => ({ code: this.countryCode }),
    stream: ({ params: { code } }) => this.countryService.searchByCountryByAlphaCode(code),
  });
}
