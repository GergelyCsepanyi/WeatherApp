import {makeAutoObservable} from 'mobx';

export type City = {
  id: string;
  name: string;
};

const addCity = (cities: City[], cityName: string): City[] => [
  ...cities,
  {
    id: '',
    name: cityName,
  },
];

const removeCity = (cities: City[], id: string): City[] =>
  cities.filter(city => city.id !== id);

class Cities {
  cities: City[] = [
    {
      id: '1',
      name: 'Szeged',
      //coordinates for the weather api
    },
    {
      id: '2',
      name: 'Putnok',
    },
    {
      id: '3',
      name: 'Miskolc',
    },
  ];

  //newCity: City = {id: '', name: ''};

  constructor() {
    makeAutoObservable(this);
  }

  removeCity(id: string) {
    this.cities = removeCity(this.cities, id);
  }

  addCity(cityName: string) {
    this.cities = addCity(this.cities, cityName);
  }

  // fetchCity(url: string) {
  //   fetch(url)
  //     .then(resp => resp.json())
  //     .then(data => console.log(data));
  // }
}

const store = new Cities();

export default store;
