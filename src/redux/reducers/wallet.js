// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_API, SAVE_FORM, DELETE_EXPENSE, EDIT_EXPENSE } from '../actions/index';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API:
    return { ...state, currencies: action.currencies };
  case SAVE_FORM:
    return {
      ...state,
      expenses: [...state.expenses, action.exchangeRates],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.expenses,
    };

  case EDIT_EXPENSE:
    return {
      ...state,
      editor: action.editor,
      idToEdit: action.idToEdit,
    };
  default:
    return state;
  }
}

export default wallet;
