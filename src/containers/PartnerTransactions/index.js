import React from 'react';
import styles from './styles.scss';

// components
import Transactions from '@components/Transactions';

class PartnerTransactions extends React.Component {
    constructor(props) {
        super(props)

        // this.data = JSON.parse(props.data.Item1);
    }
    
    render() {
        return (
            <div className={ styles.wrapper }>
                <h1>Transactions</h1>
                <div className={ styles.inputContainers }>
                    <input placeholder={'UserName'} />
                    <input placeholder={'TransactionId'} />
                    <input placeholder={'Status'} />
                </div>
                <Transactions />
            </div>
        );
    }
}

export default PartnerTransactions;