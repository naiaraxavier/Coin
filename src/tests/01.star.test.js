import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../helpers/renderWith';
import App from '../App';

describe('Testes automatizados do Login', () => {
  it('A rota para esta página é "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
  });

  it('É renderizado um elemento para que o usuário insira seu email e senha', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByPlaceholderText(/e-mail/i);
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByPlaceholderText(/senha/i);
    expect(inputPassword).toBeInTheDocument();

    expect.assertions(2);
  });

  it('É renderizado um botão com o texto "Entrar"', () => {
    renderWithRouterAndRedux(<App />);

    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeInTheDocument();

    expect.assertions(1);
  });

  it('É um e-mail no formato válido', () => {
    renderWithRouterAndRedux(<App />);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect('meu@email.com').toMatch(emailRegex);

    expect.assertions(1);
  });

  it('A senha tem 6 ou mais caracteres', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByPlaceholderText(/e-mail/i);
    const inputPassword = screen.getByPlaceholderText(/senha/i);

    fireEvent.change(inputEmail, { target: { value: 'teste@teste.com' } });
    fireEvent.change(inputPassword, { target: { value: '12345' } });

    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeDisabled();

    fireEvent.change(inputPassword, { target: { value: '123456' } });

    expect(button).not.toBeDisabled();

    expect.assertions(2);
  });

  it('Desabilita o botão Entrar caso e-mail e/ou senha estiverem no formato inválido', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByPlaceholderText(/e-mail/i);
    const inputPassword = screen.getByPlaceholderText(/senha/i);

    fireEvent.change(inputEmail, { target: { value: 'teste@com' } });
    fireEvent.change(inputPassword, { target: { value: '12345' } });

    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeDisabled();

    expect.assertions(1);
  });

  it('Habilita o botão Entrar caso e-mail e senha sejam válidos', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByPlaceholderText(/e-mail/i);
    const inputPassword = screen.getByPlaceholderText(/senha/i);

    fireEvent.change(inputEmail, { target: { value: 'naiara@email.com' } });
    fireEvent.change(inputPassword, { target: { value: '123456' } });

    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).not.toBeDisabled();

    expect.assertions(1);
  });

  it('Salva o email no estado da aplicação, com a chave email, assim que o usuário logar', () => {
    const { store } = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByPlaceholderText(/e-mail/i);
    const inputPassword = screen.getByPlaceholderText(/senha/i);

    fireEvent.change(inputEmail, { target: { value: 'teste@email.com' } });
    fireEvent.change(inputPassword, { target: { value: '123456' } });

    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).not.toBeDisabled();
    fireEvent.click(button);

    const state = store.getState();

    expect(state.user.email).toBe('teste@email.com');

    expect.assertions(2);
  });

  it('A rota é alterada para "/carteira" após o clique no botão', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByPlaceholderText(/senha/i);
    const button = screen.getByRole('button', { name: /entrar/i });

    fireEvent.change(inputEmail, { target: { value: 'fulano@email.com' } });
    fireEvent.change(inputPassword, { target: { value: '123456' } });
    fireEvent.click(button);

    expect(history.location.pathname).toBe('/carteira');

    expect.assertions(1);
  });
});
