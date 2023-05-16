import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { deleteExpense } from '../redux/actions/index';
import '../css/Table.css';

class Table extends Component {
  handleClickDelete = (id) => {
    const { expenses, dispatch } = this.props;
    const filter = expenses.filter((expense) => expense.id !== id);
    dispatch(deleteExpense(filter));
    console.log(filter);
  };

  render() {
    const { expenses } = this.props;
    console.log(expenses);
    return (
      <div className="container-table">
        <table className="table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 && expenses.map(({ description,
              tag,
              method,
              value,
              currency,
              exchangeRates,
              id,
            }) => (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ Number(value).toFixed(2) }</td>
                <td>{ exchangeRates[currency].name }</td>
                <td>{ Number((exchangeRates[currency].ask)).toFixed(2) }</td>
                <td>{ (value * exchangeRates[currency].ask).toFixed(2) }</td>
                <td> Real </td>
                <td>
                  <button>
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleClickDelete(id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
};

const mapStateToProps = (globalState) => ({
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
