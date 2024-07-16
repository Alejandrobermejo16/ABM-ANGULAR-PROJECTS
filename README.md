# CambioMoneda

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


# ScreenMoneyComponent

## Descripción

El componente `ScreenMoneyComponent` permite a los usuarios seleccionar dos países y convertir una cantidad de dinero de la moneda del primer país a la moneda del segundo país utilizando dos APIs: `restcountries` para obtener información sobre los países y sus monedas, y `exchangerate-api` para obtener las tasas de cambio.

## Funcionalidades

- Carga y muestra una lista de países con sus banderas en dos dropdowns.
- Permite ingresar una cantidad de dinero para convertir.
- Intercambia los valores seleccionados en los dropdowns.
- Realiza la conversión de moneda utilizando los códigos de las divisas de los países seleccionados.
- Muestra el resultado de la conversión.

## Archivos Principales

- `screen-money.component.ts`: Contiene la lógica del componente.
- `screen-money.component.html`: Contiene el template HTML del componente.
- `screen-money.component.css`: Contiene los estilos del componente.

## Servicios

- `LoadCountriesService`: Servicio que se utiliza para cargar datos de países y obtener los códigos de las divisas.
- `CurrencyExchangeService`: Servicio que se utiliza para realizar la conversión de divisas.

## Ejemplo de Uso

1. Selecciona un país de origen y un país de destino.
2. Ingresa una cantidad de dinero.
3. Haz clic en el botón "Convertir" para obtener el valor convertido.

## Dependencias

- `HttpClientModule` para realizar solicitudes HTTP.
- `FormsModule` para la vinculación de datos en formularios.

## Mejoras Futuras

- Manejo de errores más robusto.
- Soporte para más opciones de filtrado y búsqueda.
- Mejora en el diseño y la usabilidad del componente.
