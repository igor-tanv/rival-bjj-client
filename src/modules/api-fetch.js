require('es6-promise').polyfill();
require('isomorphic-fetch');

export function apiFetch(path, method, data = {}) {
  return fetch(`//${process.env.REACT_APP_HOST}/api/${path}`)
    .then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })

}