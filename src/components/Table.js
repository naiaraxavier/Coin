import React, { Component } from 'react';
import '../css/Table.css';

class Table extends Component {
  render() {
    return (
      <div className="container-table">
        <table className="table">
          <thead>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </thead>
        </table>
      </div>
    );
  }
}

export default Table;
