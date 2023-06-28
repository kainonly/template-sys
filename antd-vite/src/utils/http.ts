export const http = {
  get: (url: string) => {
    return fetch(url, {
      method: 'GET'
    });
  }
};
