import { Component, Input, OnInit } from '@angular/core';
import { LoadCountriesService } from '../../services/load-countries.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


interface Country {
  name: {
    common: string;
  };
  cca3: string;
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
 
  
  @Input() selectValue1: string = '';
  @Input() selectValue2: string = '';



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

  change(){
    alert('El boton ha sido clickado');
    [this.selectValue1, this.selectValue2] = [this.selectValue2, this.selectValue1];


  }

  convert(){
    alert('El cambio se ha realizado con exito');
  }
}
