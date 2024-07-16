import { Component, OnInit } from '@angular/core';
import { LoadCountriesService } from '../../services/load-countries.service';
import { CurrencyExchangeService } from '../../services/currency-exchange.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Country {
  name: {
    common: string;
  };
  cca3: string;
  flags: {
    png: string;
  };
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
}

@Component({
  selector: 'app-screen-money',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './screen-money.component.html',
  styleUrls: ['./screen-money.component.css'],
})
export class ScreenMoneyComponent implements OnInit {
  countries: Country[] = [];
  selectValue1: string = '';
  selectValue2: string = '';
  amount: number = 0;
  convertedAmount: number | null = null;

  // Diccionario para almacenar las banderas
  flagUrls: { [key: string]: string } = {};

  constructor(
    //se guardan en variables los servicios para poder llamarlas con la suscripcion de una manera mas clara
    private loadCountriesService: LoadCountriesService,
    private currencyExchangeService: CurrencyExchangeService
  ) {}

  //metodo de construccion de componente
  ngOnInit(): void {
    this.loadCountriesService.getData().subscribe(
      (data: Country[]) => {
        this.countries = data;
        // Ordena los países para el select
        this.countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

        // Crea el diccionario de banderas
        this.flagUrls = this.countries.reduce((acc, country) => {
          acc[country.cca3] = country.flags.png;
          return acc;
        }, {} as { [key: string]: string });
      },
      (error: any) => {
        console.error('Error al cargar los datos de los países', error);
      }
    );
  }

  change() {
    // Cambio del valor de combos
    [this.selectValue1, this.selectValue2] = [this.selectValue2, this.selectValue1]; 
  }


  //funcion de conversion de moneda
  convert() {
    if (this.selectValue1 && this.selectValue2 && this.amount > 0) {
      // Obtén los códigos de moneda de los países seleccionados
      const fromCountry = this.countries.find(c => c.cca3 === this.selectValue1);
      const toCountry = this.countries.find(c => c.cca3 === this.selectValue2);

      if (fromCountry && toCountry) {
        const fromCurrency = Object.keys(fromCountry.currencies)[0];
        const toCurrency = Object.keys(toCountry.currencies)[0];

        this.currencyExchangeService.convertCurrency(this.amount, fromCurrency, toCurrency).subscribe(
          (result) => {
            this.convertedAmount = result;
          },
          (error) => {
            console.error('Error al realizar la conversión de divisas', error);
          }
        );
      }
    } else {
      alert('Por favor, asegúrate de que todos los campos estén completos y que el importe sea positivo.');
    }
  }

  // Devuelve la URL de la bandera desde el diccionario 
  getFlagUrl(countryCode: string): string {
    return this.flagUrls[countryCode] || '';  
  }
}
