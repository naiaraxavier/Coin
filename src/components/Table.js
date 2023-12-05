import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { deleteExpense, editExpense } from '../redux/actions/index';
import excluir from '../imgs/excluir.png';
import edit from '../imgs/edit.png';
import '../css/Table.css';

class Table extends Component {
  handleClickDelete = (id) => {
    const { expenses, dispatch } = this.props;
    const filter = expenses.filter((expense) => expense.id !== id);
    dispatch(deleteExpense(filter));
  };

  handleClickEdit = (id) => {
    const { dispatch } = this.props;
    dispatch(editExpense(true, id));
  };

  render() {
    const { expenses } = this.props;
    // console.log(expenses);
    return (
      <div className="container-table2">
        <table className="table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th className="vertical-line">Tag</th>
              <th className="vertical-line">Método de pagamento</th>
              <th className="vertical-line">Valor</th>
              <th className="vertical-line">Moeda</th>
              <th className="vertical-line">Câmbio utilizado</th>
              <th className="vertical-line">Valor convertido</th>
              <th className="vertical-line">Moeda de conversão</th>
              <th className="vertical-line">Editar/Excluir</th>
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
                  <button
                    className="edit-btn"
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.handleClickEdit(id) }
                  >
                    <img src={ edit } alt="excluir" />
                  </button>
                  <button
                    className="delete-btn"
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleClickDelete(id) }
                  >
                    <img src={ excluir } alt="excluir" />
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
