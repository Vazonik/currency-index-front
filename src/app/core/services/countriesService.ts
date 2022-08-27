import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country, CountryRaw, CountryAndCurrency } from '../models/country';
import { COUNTRIES } from '../data/countries';
import CurrenciesService from './currenciesService';
import { lastValueFrom } from 'rxjs';

@Injectable()
export default class CountriesService {
  constructor(private currenciesService: CurrenciesService) {}

  public async getCountriesWithCurrencies(): Promise<CountryAndCurrency[]> {
    const currencies = await lastValueFrom(
      this.currenciesService.getCurrencies()
    );

    return COUNTRIES.map((country) => {
      let countryWithCurrency: CountryAndCurrency = country;
      countryWithCurrency.currency =
        currencies.find((c) => c.code == country.currency) || country.currency;
      return countryWithCurrency;
    });
  }
}
