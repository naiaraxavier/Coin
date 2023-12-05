import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import '../css/Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <div className="container-header-form">
          <Header />
          <WalletForm />
        </div>
        <div className="container-table">
          <Table />
        </div>
      </div>
    );
  }
}

export default Wallet;
