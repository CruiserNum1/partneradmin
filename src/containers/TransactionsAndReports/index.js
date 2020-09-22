import React from 'react';
import styles from './styles.scss';

// components
import Transactions from '@components/Transactions';

class TransactionsAndReports extends React.Component {
    constructor(props) {
        super(props)

        // this.data = JSON.parse(props.data.Item1);
    }
    
    render() {
        return (
            <div className={ styles.wrapper }>
                <h1>Transactions and reports</h1>
                <div className={ styles.inputContainers }>
                    <input placeholder={'Date of begin'} />
                    <input placeholder={'Date of end'} />
                    <input placeholder={'UserName'} />
                    <input placeholder={'TransactionId'} />
                    <input placeholder={'Status'} />
                </div>
                <Transactions />
            </div>
        );
    }
}

export default TransactionsAndReports;