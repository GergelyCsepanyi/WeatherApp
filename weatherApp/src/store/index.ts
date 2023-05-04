import {makeAutoObservable} from 'mobx';
import {CityResponse} from '../services/CitiesAPI';

export type City = {
  city: string;
  country: string;
  countryCode: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
};

const addCity = (cities: City[], city: City): City[] => [...cities, city];

const removeCity = (cities: City[], id: number): City[] =>
  cities.filter(city => city.id !== id);

class Cities {
  cities: City[] = [
    {
      city: 'Putnok',
      country: 'Hungary',
      countryCode: 'HU',
      id: 50009,
      latitude: 48.293611111,
      longitude: 20.436666666,
      name: 'Putnok',
    },
  ];

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
}

const store = new Cities();

export default store;
