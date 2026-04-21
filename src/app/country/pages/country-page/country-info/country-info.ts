import { Component, computed, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Country } from '../../../interfaces';

@Component({
  selector: 'country-info',
  imports: [DecimalPipe],
  templateUrl: './country-info.html',
})
export class CountryInfo {
  country = input.required<Country>();
  currentYear = computed(() => new Date().getFullYear());
}
