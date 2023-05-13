// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const REQUEST_API = 'REQUEST_API';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const requestApi = (apiResponse) => ({
  type: REQUEST_API,
  currencies: apiResponse,
});

export const actionFetchApi = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const apiResponse = await response.json();
  const coinsFilter = Object.keys(apiResponse).filter((coin) => coin !== 'USDT');
  dispatch(requestApi(coinsFilter));
};
