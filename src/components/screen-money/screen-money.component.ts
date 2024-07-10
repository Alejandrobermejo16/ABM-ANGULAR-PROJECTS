import { Component, OnInit } from '@angular/core';
import { LoadCountriesService } from '../../services/load-countries.service';
import { CommonModule } from '@angular/common';

interface Country {
  name: {
    common: string;
  };
  cca3: string;
}

@Component({
  selector: 'app-screen-money',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './screen-money.component.html',
  styleUrls: ['./screen-money.component.css'],
})
export class ScreenMoneyComponent implements OnInit {
  countries: Country[] = [];

  constructor(private loadCountriesService: LoadCountriesService) {}

  ngOnInit(): void {
    this.loadCountriesService.getData().subscribe(
      (data: Country[]) => {
        this.countries = data.map(country => ({
          name: { common: country.name.common },
          cca3: country.cca3
        }));
        console.log(this.countries);
      },
      (error: any) => {
        console.error('Error al cargar los datos de los países', error);
      }
    );
  }
}
