import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionFetchApi, saveForm } from '../redux/actions/index';
import '../css/WalletForm.css';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'dinheiro',
    tag: 'alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionFetchApi());
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  requestApi = async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const apiResponse = await response.json();
    delete apiResponse.USDT;
    return apiResponse;
  };

  handleClick = async (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    const objSaveForm = {
      id: 0,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: this.requestApi(),
    };
    // salvar email no state global
    dispatch(saveForm(objSaveForm));
  };

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    const {
      currencies,
    } = this.props;

    // console.log(currencies);

    return (
      <div className="container-wallet-form">
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            name="value"
            type="number"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="description">
          Descrição da despesa:
          <input
            data-testid="description-input"
            name="description"
            type="text"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="currency">Moeda:</label>
        <select
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          {currencies.map((coin) => (
            <option key={ coin } value={ coin }>
              { coin }
            </option>
          ))}
        </select>

        <label htmlFor="method">Método de pagamento:</label>
        <select
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ this.handleChange }
        >
          <option value="dinheiro">Dinheiro</option>
          <option value="cartão de crédito">Cartão de crédito</option>
          <option value="cartão de débito">Cartão de débito</option>
        </select>

        <label htmlFor="tag">Categoria da despesa:</label>
        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option value="alimentação">Alimentação</option>
          <option value="lazer">Lazer</option>
          <option value="trabalho">Trabalho</option>
          <option value="transporte">Transporte</option>
          <option value="saúde">Saúde</option>
        </select>

        <button
          type="submit"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (globalState) => ({
  currencies: globalState.wallet.currencies,
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
