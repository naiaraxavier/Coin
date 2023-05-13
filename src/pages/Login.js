import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { addEmail } from '../redux/actions';
import logoTrybeWallet from '../imgs/logoTrybeWallet.png';
import '../css/Login.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isButtonDisabled: true,
  };

  validateEmail = (emailToValidate) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(emailToValidate);
  };

  validatePassword = (passwordToValidate) => {
    const minValue = 6;
    return passwordToValidate.length >= minValue;
  };

  validationFields = () => {
    const { email, password } = this.state;

    const validationsFields = this.validateEmail(email)
    && this.validatePassword(password);

    this.setState({
      isButtonDisabled: !(validationsFields),
    });
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    }, this.validationFields);
  };

  handleClick = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    // salvar email no state global
    dispatch(addEmail(email));
    history.push('/carteira');
  };

  render() {
    const {
      email,
      password,
      isButtonDisabled,
    } = this.state;

    return (
      <div className="container-login">
        <img
          className="img-logo-login"
          src={ logoTrybeWallet }
          alt="logo TrybeWallet"
        />
        <input
          data-testid="email-input"
          className="login-input"
          name="email"
          placeholder="E-mail"
          type="text"
          value={ email }
          onChange={ this.handleChange }
        />
        <input
          data-testid="password-input"
          className="login-input"
          name="password"
          placeholder="Senha"
          type="password"
          value={ password }
          onChange={ this.handleChange }
        />
        <button
          type="submit"
          disabled={ isButtonDisabled }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
});

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Login);
