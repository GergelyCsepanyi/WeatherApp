// export enum APIType {
//   citiesAPI,
//   weatherAPI,
// }

// export const request = <T>(
//   apiType: APIType,
//   url: string,
//   options: {},
// ): Promise<T | null> => {
//   switch (apiType) {
//     case APIType.citiesAPI:
//       return fetch(url, options)
//         .then(res => res.json())
//         .then(data => data.data as T)
//         .catch(error => {
//           console.log('Error during fetch: ', error);
//           return null;
//         });
//     case APIType.weatherAPI:
//       return fetch(url, options)
//         .then(res => res.json())
//         .then(data => data as T)
//         .catch(error => {
//           console.log('Error during fetch: ', error);
//           return null;
//         });
//   }
// };

export enum APIType {
  citiesAPI = 'citiesAPI',
  weatherAPI = 'weatherAPI',
}

export const request = <T>(
  apiType: APIType,
  url: string,
  options: {},
): Promise<T | null> => {
  return fetch(url, options)
    .then(res => res.json())
    .then(data => {
      console.log('DATA:', data as T);
      switch (apiType) {
        case APIType.citiesAPI:
          return data.data as T;
        case APIType.weatherAPI:
          return data as T;
      }
    })
    .catch(error => {
      console.log(`Error during fetch at API '${apiType}': `, error);
      return null;
    });
};
