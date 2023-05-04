export const request = <T>(url: string, options: {}): Promise<T | null> => {
  return fetch(url, options)
    .then(res => res.json())
    .then(data => data.data as T)
    .catch(error => {
      console.log('Error during fetch: ', error);
      return null;
    });
};
