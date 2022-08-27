import Currency from './currency';

export interface CountryRaw {
  code: string;
  name: string;
  flag: string;
  currency: string;
  svgPaths: string[];
}

export interface Country {
  code: string;
  name: string;
  flag: string;
  currency: string;
}

export interface CountryAndCurrency {
  code: string;
  name: string;
  flag: string;
  currency: Currency | string;
}
