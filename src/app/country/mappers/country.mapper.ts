import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-countries.interfaces";

export class CountryMapper {
  // static RestCountry => Country
  static toCountry(restCountry: RESTCountry): Country {
    return {
      name: restCountry.translations['spa'].common ?? 'No Spanish Name',
      capital: restCountry.capital ? restCountry.capital[0] : 'N/A',
      population: restCountry.population,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      cca2: restCountry.cca2,
      region: restCountry.region,
      subRegion: restCountry.subregion
    };
  }

  // static RestCountry[] => Country[]
  static toCountries(restCountries: RESTCountry[]): Country[] {
    return restCountries.map(this.toCountry);
  }
}
