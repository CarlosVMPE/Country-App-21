import { Component } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';

@Component({
  selector: 'by-region-page',
  imports: [CountryList],
  templateUrl: './by-region-page.html',
})
export class ByRegionPage { }
