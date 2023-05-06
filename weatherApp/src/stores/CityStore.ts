import {makeAutoObservable} from 'mobx';
import {CityResponse, citiesApi} from '../services/CitiesAPI';
import Geolocation from '@react-native-community/geolocation';

export type City = {
  id: number;
  name: string;
  city: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
};

type Position = {
  latitude: number;
  longitude: number;
};

const addCity = (cities: City[], city: City): City[] => {
  if (cities.find(currentCity => currentCity.id === city.id)) {
    return cities;
  }
  return [...cities, city];
};

const removeCity = (cities: City[], id: number): City[] =>
  cities.filter(city => city.id !== id);

const changeCurrentCity = (position: Position): Promise<CityResponse | null> =>
  citiesApi
    .fetchCitiesByLocation(position.latitude, position.longitude)
    .then(res => {
      if (res && res.length > 0) {
        return res[0];
      }
      return null;
    })
    .catch(err => {
      console.log('Error during city fetch by location:', err);
      return null;
    });

export class CityStore {
  readonly defaultCity = {
    city: 'Putnok',
    country: 'Hungary',
    countryCode: 'HU',
    id: 50009,
    latitude: 48.293611111,
    longitude: 20.436666666,
    name: 'Putnok',
  };

  cities: City[] = [this.defaultCity];

  currentPosition: Position | undefined = undefined;

  currentCity = this.defaultCity;

  constructor() {
    makeAutoObservable(this);

    Geolocation.getCurrentPosition(info =>
      this.changeCurrentPosition({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      }),
    );
  }

  changeCurrentPosition(position: Position) {
    this.currentPosition = position;
  }

  async changeCurrentCity() {
    if (!this.currentPosition) {
      return;
    }
    const result = await changeCurrentCity(this.currentPosition);
    if (!result) {
      this.currentCity = this.defaultCity;
    } else {
      this.currentCity = result;
    }
  }

  removeCity(id: number) {
    this.cities = removeCity(this.cities, id);
  }

  addCity(city: CityResponse) {
    this.cities = addCity(this.cities, city);

    console.log('cities after add:', this.cities);
  }

  replaceCities(cities: City[]) {
    this.cities = cities;
  }
}
