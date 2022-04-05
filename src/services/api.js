const API_URL = 'http://localhost:4000/api'
const TOKEN_KEY = 'token'

export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const setToken = ( value ) => localStorage.setItem(TOKEN_KEY, value)
export const clearToken = () => localStorage.removeItem(TOKEN_KEY)


const httpPost = async (path, data) => {
    const url = `${API_URL}/${path}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // add the token from localStorage into every request
        'X-Token': getToken(),
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (json.error) {
      throw new Error(json.error);
    }
    return json;
  };

export const connect = (host, cert, macaroon) => {
    const request = {host, cert, macaroon}
    const { token } = httpPost('connect', request)
    setToken( token )
 }