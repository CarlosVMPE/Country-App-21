export interface Country {
  name: string;
  capital: string;
  population: number;
  flag: string;
  flagSvg: string;
  cca2?: string;
  region: string;
  subRegion: string;
}

export type Region =
  | 'Africa'
  | 'Americas'
  | 'Asia'

  | 'Europe'
  | 'Oceania'
  | 'Antarctic';

export const regions: Region[] = [
  'Africa',
  'Americas',
  'Asia',
  'Europe',
  'Oceania',
  'Antarctic',
];

export interface RegionOptions {
  region: Region;
  classType: string;
}

export const regionOptions: RegionOptions[] = [
  { region: 'Africa', classType: 'btn-primary' },
  { region: 'Americas', classType: 'btn-secondary' },
  { region: 'Asia', classType: 'btn-accent' },
  { region: 'Europe', classType: 'btn-info' },
  { region: 'Oceania', classType: 'btn-success' },
  { region: 'Antarctic', classType: 'btn-warning' },
]


// const url = `${API_URL}/region/${region}`;
