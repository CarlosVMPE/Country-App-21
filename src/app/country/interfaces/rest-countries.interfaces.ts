export interface RESTCountry {
  tld:          string[];
  cca2:         string;
  ccn3:         string;
  cca3:         string;
  cioc:         string;
  independent:  boolean;
  status:       string;
  unMember:     boolean;
  idd:          Idd;
  capital:      string[];
  altSpellings: string[];
  region:       string;
  subregion:    string;
  landlocked:   boolean;
  borders:      string[];
  area:         number;
  maps:         Maps;
  population:   number;
  fifa:         string;
  car:          Car;
  timezones:    string[];
  continents:   string[];
  flag:         string;
  name:         Name;
  currencies:   Currencies;
  languages:    Languages;
  latlng:       number[];
  demonyms:     Demonyms;
  translations: { [key: string]: Translation };
  gini:         { [key: string]: number };
  flags:        Flags;
  coatOfArms:   CoatOfArms;
  startOfWeek:  string;
  capitalInfo:  CapitalInfo;
  postalCode:   PostalCode;
}

export interface CapitalInfo {
  latlng: number[];
}

export interface Car {
  signs: string[];
  side:  string;
}

export interface CoatOfArms {
  png: string;
  svg: string;
}

export interface Currencies {
  HNL?: Bif;
  BIF?: Bif;
}

export interface Bif {
  symbol: string;
  name:   string;
}

export interface Demonyms {
  eng: Eng;
  fra: Eng;
}

export interface Eng {
  f: string;
  m: string;
}

export interface Flags {
  png: string;
  svg: string;
  alt: string;
}

export interface Idd {
  root:     string;
  suffixes: string[];
}

export interface Languages {
  spa?: string;
  fra?: string;
  run?: string;
}

export interface Maps {
  googleMaps:     string;
  openStreetMaps: string;
}

export interface Name {
  common:     string;
  official:   string;
  nativeName: NativeName;
}

export interface NativeName {
  spa?: Translation;
  fra?: Translation;
  run?: Translation;
}

export interface Translation {
  official: string;
  common:   string;
}

export interface PostalCode {
  format: null | string;
  regex:  null | string;
}
