import {makeAutoObservable} from 'mobx';
import {CityResponse} from '../services/CitiesAPI';

export type City = {
  id: number;
  name: string;
  city: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
};

const addCity = (cities: City[], city: City): City[] => [...cities, city];

const removeCity = (cities: City[], id: number): City[] =>
  cities.filter(city => city.id !== id);

class Cities {
  readonly defaultCity = {
    city: 'Putnok',
    country: 'Hungary',
    countryCode: 'HU',
    // id: 50009,
    id: 716247,
    latitude: 48.293611111,
    longitude: 20.436666666,
    name: 'Putnok',
  };

  cities: City[] = [this.defaultCity];

  // private currentCity: City;

  currentCity = this.defaultCity;

  constructor() {
    makeAutoObservable(this);
  }

  removeCity(id: number) {
    this.cities = removeCity(this.cities, id);
  }

  addCity(city: CityResponse) {
    if (this.cities.find(currentCity => currentCity.id === city.id)) {
      return;
    }
    this.cities = addCity(this.cities, city);
  }

  replaceCities(cities: City[]) {
    this.cities = cities;
  }

  // getCurrentCity() {
  //   if (this.currentCity) {
  //     return this.currentCity;
  //   } else {
  //     return this.defaultCity;
  //   }
  // }

  // setCurrentCity(city: City) {
  //   this.currentCity = city;
  // }
}

const store = new Cities();

export default store;
