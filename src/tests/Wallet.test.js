import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from '../helpers/renderWith';
import mockData from '../helpers/mockData';
import App from '../App';

const initialState = {
  user: {
    email: 'teste@teste.com',
  },
  wallet: {
    currencies: ['USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR', 'JPY', 'CHF',
      'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'],
    expenses: [{
      id: 0,
      value: '10',
      description: 'Comida japonesa',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: mockData,
    }],
    editor: false,
    idToEdit: 0,
  },
};

describe('Teste do Header da página na rota /carteira', () => {
  it('verifica se o Header é renderizada corretamente', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const logo = screen.getByRole('img', { name: /logo trybewallet/i });
    expect(logo).toBeInTheDocument();

    const text = screen.getByText(/total de despesas:/i);
    expect(text).toBeInTheDocument();

    const textCurrency = screen.getByText(/brl/i);
    expect(textCurrency).toBeInTheDocument();

    expect.assertions(3);
  });

  it('Verifica se os elementos do state são renderizados no Header', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    const value = 10;
    const currency = 'USD';
    const exchangeRates = mockData;

    const expectedValue = value * exchangeRates[currency].ask;
    const resultValue = expectedValue.toFixed(2);

    const result = screen.getAllByText(resultValue.toString());
    expect(result[0]).toBeInTheDocument();

    const valueHeader = screen.getByTestId('total-field');
    expect(valueHeader).toHaveTextContent('47.53');

    const email = screen.getByText(/teste@teste\.com/i);
    expect(email).toBeInTheDocument();

    expect.assertions(3);
  });
});

describe('Teste da tabela de despesas', () => {
  it('Verifica se o header da tabela é renderizada corretamente', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const textdescription = screen.getByRole('columnheader', { name: /descrição/i });
    expect(textdescription).toBeInTheDocument();

    const textTag = screen.getByRole('columnheader', { name: /tag/i });
    expect(textTag).toBeInTheDocument();

    const textPayMethod = screen.getByRole('columnheader', { name: /método de pagamento/i });
    expect(textPayMethod).toBeInTheDocument();

    const textValue = screen.getAllByRole('columnheader', { name: /valor/i });
    expect(textValue[0]).toBeInTheDocument();

    const textCoin = screen.getAllByRole('columnheader', { name: /moeda/i });
    expect(textCoin[0]).toBeInTheDocument();

    const textCambio = screen.getByRole('columnheader', { name: /câmbio utilizado/i });
    expect(textCambio).toBeInTheDocument();

    const textValueConvert = screen.getByRole('columnheader', { name: /valor convertido/i });
    expect(textValueConvert).toBeInTheDocument();

    const textCoinConvert = screen.getByRole('columnheader', { name: /moeda de conversão/i });
    expect(textCoinConvert).toBeInTheDocument();

    const textEditDelete = screen.getByRole('columnheader', { name: /editar\/excluir/i });
    expect(textEditDelete).toBeInTheDocument();

    expect.assertions(9);
  });

  it('', () => {});
});

describe('Teste dos valores do state global', () => {
  it('Verifica se há currencies no state global', () => {
    const { store } = renderWithRouterAndRedux(<App />, initialState);

    const array = ['USD', 'CAD', 'GBP', 'ARS', 'BTC', 'LTC', 'EUR', 'JPY', 'CHF',
      'AUD', 'CNY', 'ILS', 'ETH', 'XRP', 'DOGE'];

    const state = store.getState();
    expect(state.wallet.currencies).toBeDefined();
    expect(initialState.wallet.currencies).toEqual(array);

    expect.assertions(2);
  });
});
