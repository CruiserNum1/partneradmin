import React from 'react';
import styles from './styles.scss';

// redux
import { connect } from 'react-redux';

// components
import Transactions from '@components/Transactions';
import { withTranslation, Trans } from 'react-i18next';

// requests
import { getTransactions } from '@requests/authorization/getTransactions';

const getTransactionsInstance = getTransactions.getInstance();

class PartnerTransactions extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            transactions: this.props.transactions,
            page: 0,
            limit: '',
            userName: '',
            transactionId: '',
            status: '',
            showLoader: false
        };
    }

    searchTransactions() {
        let dataObj = {
            info: {
                limit: this.state.limit,
                status: this.state.status,
                trans_id: this.state.transactionId,
                user_id: this.state.userName
            }
        };

        this.setState({ showLoader: true });
        getTransactionsInstance.request(dataObj);
        getTransactionsInstance.response(res => {
            if (res?.d?.Item1) {
                let transactionsResult = JSON.parse(res.d.Item1);

                this.setState({
                    transactions: transactionsResult,
                    page: 0,
                    showLoader: false
                })
            }
        });
    }

    backButtonClick() {
        if (!this.state.page) {
            return;
        }
        
        const page = this.state.page - 1;
        
        let dataObj = {
            info: {
                limit: this.state.limit,
                status: this.state.status,
                trans_id: this.state.transactionId,
                user_id: this.state.userName,
                offset: page * 50
            }
        };

        this.setState({ showLoader: true });
        getTransactionsInstance.request(dataObj);
        getTransactionsInstance.response(res => {
            if (res?.d?.Item1) {
                let transactionsResult = JSON.parse(res.d.Item1);

                this.setState({
                    transactions: transactionsResult,
                    page: --this.state.page,
                    showLoader: false
                })
            }
        });
    }

    forwardButtonClick() {
        if (!this.state.transactions.length) {
            return;
        }
        
        const page = this.state.page + 1;

        let dataObj = {
            info: {
                limit: this.state.limit,
                status: this.state.status,
                trans_id: this.state.transactionId,
                user_id: this.state.userName,
                offset: page * 50
            }
        };

        this.setState({ showLoader: true });
        getTransactionsInstance.request(dataObj);
        getTransactionsInstance.response(res => {
            if (res?.d?.Item1) {
                let transactionsResult = JSON.parse(res.d.Item1);

                this.setState({
                    transactions: transactionsResult,
                    page: ++this.state.page,
                    showLoader: false
                })
            }
        });
    }
    
    render() {
        return (
            <div className={ styles.wrapper }>
                <h1>
                    <Trans i18nKey="pages.dashboard.transactions.title">
                        Transactions
                    </Trans>
                </h1>
                <div className={ styles.inputContainers }>
                    <input placeholder={'UserName'} value={this.state.userName} onChange={(e) => this.setState({userName: e.target.value})} />
                    <input placeholder={'TransactionId'} value={this.state.transactionId} onChange={(e) => this.setState({transactionId: e.target.value})} />
                    <input placeholder={'Status'} value={this.state.status} onChange={(e) => this.setState({status: e.target.value})} />
                    <input placeholder={'Limit'} value={this.state.limit} onChange={(e) => this.setState({limit: e.target.value})} />
                </div>
                <button
                    className={ styles.button }
                    onClick={this.searchTransactions.bind(this)}
                >
                    <Trans i18nKey="pages.dashboard.transactions.search">
                        Search
                    </Trans>
                </button>
                <Transactions transactions={this.state.transactions} showLoader={this.state.showLoader} />
                <div className={ styles.pagination }>
                    <button
                        disabled={!this.state.page ? 'disabled' : ''}
                        onClick={this.backButtonClick.bind(this)}
                    >
                        <span>&#10094;</span> {this.props.t('pages.dashboard.transactions.back')}
                    </button>
                    <button
                        disabled={!this.state.transactions.length ? 'disabled' : ''}
                        onClick={this.forwardButtonClick.bind(this)}
                    >
                        {this.props.t('pages.dashboard.transactions.forward')} <span>&#10095;</span>
                    </button>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        transactions: JSON.parse(state.transactions.Item1)
    }),
    null
)(withTranslation()(PartnerTransactions));