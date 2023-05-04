import {makeAutoObservable} from 'mobx';

export type City = {
  id: string;
  name: string;
};

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

  constructor() {
    makeAutoObservable(this);
  }
}

const store = new Cities();

export default store;
