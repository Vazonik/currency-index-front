import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import CountriesService from './core/services/countriesService';
import CurrenciesService from './core/services/currenciesService';
import { HeaderModule } from './theme/header/header.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
  ],
  providers: [CurrenciesService, CountriesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
