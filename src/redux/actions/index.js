// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const REQUEST_API = 'REQUEST_API';
export const SAVE_FORM = 'SAVE_FORM';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const saveForm = (object) => ({
  type: SAVE_FORM,
  exchangeRates: object,
});

export const requestApi = (apiResponse) => ({
  type: REQUEST_API,
  currencies: apiResponse,
});

export const deleteExpense = (filter) => ({
  type: DELETE_EXPENSE,
  expenses: filter,
});

export const actionFetchApi = (objSaveForm) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const apiResponse = await response.json();
  if (objSaveForm) {
    dispatch(saveForm({ ...objSaveForm, exchangeRates: apiResponse }));
  } else {
  // console.log(apiResponse);
    delete apiResponse.USDT;
    const objectKeysApi = Object.keys(apiResponse);
    // console.log(objectKeysApi);
    dispatch(requestApi(objectKeysApi));
  }
};
