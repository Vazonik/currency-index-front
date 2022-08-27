import { Component } from '@angular/core';
import CurrenciesService from 'src/app/core/services/currenciesService';
import Currency from 'src/app/core/models/currency';
import CountriesService from 'src/app/core/services/countriesService';

@Component({
  selector: 'ci-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  constructor(
    private currenciesService: CurrenciesService,
    private countriesService: CountriesService
  ) {
    this.test();
  }

  async test() {
    console.log(await this.countriesService.getCountriesWithCurrencies());
  }
}
