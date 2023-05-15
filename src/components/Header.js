import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import logoTrybeWallet from '../imgs/logoTrybeWallet.png';
import coins from '../imgs/coins.png';
import profile from '../imgs/profile.png';
import '../css/Header.css';

class Header extends Component {
  expenseSum = () => {
    const { expenses } = this.props;
    let total = 0;
    expenses.forEach(({ value, currency, exchangeRates }) => {
      const result = value * exchangeRates[currency].ask;
      total += result;
    });
    return total.toFixed(2);
  };

  render() {
    const { email } = this.props;

    return (
      <div className="container-header">
        <img
          src={ logoTrybeWallet }
          alt="logo TrybeWallet"
        />
        <div className="container-header-currency">
          <img
            className="img-icons"
            src={ coins }
            alt="coins"
          />
          <span><strong>Total de despesas:</strong></span>
          <span
            data-testid="total-field"
          >
            {this.expenseSum()}
          </span>
          <span
            data-testid="header-currency-field"
          >
            BRL
          </span>
        </div>

        <div className="container-header-email">
          <img
            className="img-icons"
            src={ profile }
            alt="coins"
          />
          <span
            data-testid="email-field"
          >
            { email }
          </span>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  expenses: globalState.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequire;

export default connect(mapStateToProps)(Header);
