import React from 'react';
import { screen, fireEvent, act } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../helpers/renderWith';
import mockData from '../helpers/mockData';
import App from '../App';

describe('Testes automatizados do WalletForm', () => {
  afterEach(() => jest.restoreAllMocks());

  it('O campo para adicionar o valor da despesa possui o data-testid="value-input"', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const inputValue = screen.getByTestId('value-input');
    expect(inputValue).toBeInTheDocument();

    fireEvent.change(inputValue, { target: { value: '10' } });

    expect(inputValue.value).toBe('10');

    expect.assertions(2);
  });

  it('O campo para adicionar a descrição da despesa possui o data-testid="description-input".', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const inputDescription = screen.getByTestId('description-input');
    expect(inputDescription).toBeInTheDocument();

    fireEvent.change(inputDescription, { target: { value: 'Comida Japonesa' } });

    expect(inputDescription.value).toBe('Comida Japonesa');

    expect.assertions(2);
  });

  it('O campo para selecionar em qual moeda será registrada a despesa possui o data-testid="currency-input"', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const inputCurrency = screen.getByTestId('currency-input');
    expect(inputCurrency).toBeInTheDocument();

    expect.assertions(1);
  });

  it('A API é chamada com o endpoint correto e o valor da chave currencies no estado global é um array que veio da API', async () => {
    delete mockData.USDT;
    act(() => {
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockData),
      });
    });

    const initialState = {
      user: {
        email: 'teste@teste.com',
      },
      wallet: {
        currencies: Object.keys(mockData),
        expenses: [{
          id: 0,
          value: '',
          description: '',
          currency: 'USD',
          method: 'Dinheiro',
          tag: 'Trabalho',
          exchangeRates: mockData,
        }],
        editor: false,
        idToEdit: 0,
      },
    };

    await act(async () => {
      const { store } = renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
      const state = store.getState();

      expect(Array.isArray(state.wallet.currencies)).toBe(true);
      expect(state.wallet.currencies.length).toBe(15);
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);

    expect(global.fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');

    // O campo para selecionar em qual moeda será registrada a despesa possui options com os
    // valores iguais ao do array localizado na chave currencies do estado global.

    const selectElement = screen.getByTestId('currency-input');
    const selectOptions = Array.from(selectElement.options).map((option) => option.value);
    const expectedOptions = initialState.wallet.currencies;

    expect(selectOptions).toEqual(expectedOptions);

    expect.assertions(5);
  });

  it('O campo para selecionar qual método de pagamento será utilizado possui o data-testid="method-input', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const methodInput = screen.getByTestId('method-input');
    expect(methodInput).toBeInTheDocument();

    fireEvent.change(methodInput, { target: { value: 'Dinheiro' } });

    expect(methodInput.value).toBe('Dinheiro');

    expect.assertions(2);
  });

  it('O campo para selecionar qual método de pagamento será utilizado possui options com os valores Dinheiro, Cartão de crédito e Cartão de débito', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const methodInput = screen.getByTestId('method-input');
    expect(methodInput).toBeInTheDocument();

    fireEvent.change(methodInput, { target: { value: 'Dinheiro' } });
    expect(methodInput.value).toBe('Dinheiro');

    fireEvent.change(methodInput, { target: { value: 'Cartão de crédito' } });
    expect(methodInput.value).toBe('Cartão de crédito');

    fireEvent.change(methodInput, { target: { value: 'Cartão de débito' } });
    expect(methodInput.value).toBe('Cartão de débito');

    expect.assertions(4);
  });

  it('O campo para selecionar uma categoria (tag) da despesa possui o data-testid="tag-input"', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const tagInput = screen.getByTestId('tag-input');
    expect(tagInput).toBeInTheDocument();

    expect.assertions(1);
  });

  it('O campo para selecionar uma categoria (tag) da despesa possui options com os valores Alimentação, Lazer, Trabalho, Transporte e Saúde', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    const tagInput = screen.getByTestId('tag-input');

    fireEvent.change(tagInput, { target: { value: 'Alimentação' } });
    expect(tagInput.value).toBe('Alimentação');

    fireEvent.change(tagInput, { target: { value: 'Lazer' } });
    expect(tagInput.value).toBe('Lazer');

    fireEvent.change(tagInput, { target: { value: 'Trabalho' } });
    expect(tagInput.value).toBe('Trabalho');

    fireEvent.change(tagInput, { target: { value: 'Transporte' } });
    expect(tagInput.value).toBe('Transporte');

    fireEvent.change(tagInput, { target: { value: 'Saúde' } });
    expect(tagInput.value).toBe('Saúde');

    expect.assertions(5);
  });
});
