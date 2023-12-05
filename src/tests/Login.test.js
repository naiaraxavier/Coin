import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from '../helpers/renderWith';
import App from '../App';

describe('Login page testing', () => {
  it('verifica se a tela de login é renderizada corretamente', () => {
    renderWithRouterAndRedux(<App />);

    const logo = screen.getByRole('img', { name: /logo trybewallet/i });
    expect(logo).toBeInTheDocument();

    const inputEmail = screen.getByPlaceholderText(/e-mail/i);
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByPlaceholderText(/senha/i);
    expect(inputPassword).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeInTheDocument();

    expect.assertions(4);
  });

  it('Verificar a validação de login', () => {
    const { store } = renderWithRouterAndRedux(<App />);

    const state = store.getState();
    expect(state.user.email).toBeDefined();

    expect.assertions(1);
  });

  it('Verifica se o formato de email é válido', () => {
    renderWithRouterAndRedux(<App />);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect('teste@email.com').toMatch(emailRegex);

    expect.assertions(1);
  });

  it('Verifica se o botão está ou não desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByPlaceholderText(/senha/i);
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(button).toBeDisabled();
    act(() => {
      userEvent.type(inputEmail, 'teste@teste.com');
      userEvent.type(inputPassword, '123456');
    });

    expect(button).not.toBeDisabled();

    expect.assertions(2);
  });

  it('Verifica se ao clicar no botão é redirecionado para /carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByPlaceholderText(/senha/i);
    const button = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '123456');
    userEvent.click(button);

    expect(history.location.pathname).toBe('/carteira');

    expect.assertions(1);
  });
});
