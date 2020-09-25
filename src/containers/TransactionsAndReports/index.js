import React from 'react';
import styles from './styles.scss';

// components
import Transactions from '@components/Transactions';
import { exportToCsv } from './exportToCsv';
import { withTranslation, Trans } from 'react-i18next';

// redux
import { connect } from 'react-redux';

// requests
import { downloadTransactions } from '@requests/partner/downloadListedTransactions';
import { getTransactions } from '@requests/authorization/getTransactions';

const downloadTransactionsInstance = downloadTransactions.getInstance();
const getTransactionsInstance = getTransactions.getInstance();

class TransactionsAndReports extends React.Component {
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

    /**
     * Download CSV file
     */
    downloadCSV() {
        let dataObj = {
            info: {
                limit: this.state.limit,
                status: this.state.status,
                trans_id: this.state.transactionId,
                user_id: this.state.userName
            }
        };

        downloadTransactionsInstance.request(dataObj);
        downloadTransactionsInstance.response(res => {
            if (res?.d) {
                let arr = JSON.parse(res?.d);
                let rows = [];
                rows.push(['CSVList']);
                rows.push([]);
                rows.push(Object.keys(arr[0]));
                arr.forEach(item => {
                    rows.push(Object.values(item))
                });
                exportToCsv('MyReport_CSVList.csv', rows);
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
                    <Trans i18nKey="pages.reports.title">
                        Transactions and reports
                    </Trans>
                </h1>
                <div className={ styles.inputContainers }>
                    <input placeholder={'Date of begin'} />
                    <input placeholder={'Date of end'} />
                    <input placeholder={'UserName'} value={this.state.userName} onChange={(e) => this.setState({userName: e.target.value})} />
                    <input placeholder={'TransactionId'} value={this.state.transactionId} onChange={(e) => this.setState({transactionId: e.target.value})} />
                    <input placeholder={'Status'} value={this.state.status} onChange={(e) => this.setState({status: e.target.value})} />
                </div>
                <button
                    className={ styles.button }
                    onClick={this.downloadCSV.bind(this)}
                >
                    <Trans i18nKey="pages.reports.downloadAs">
                        Download as .CSV
                    </Trans>
                </button>
                <Transactions transactions={this.state.transactions} showLoader={this.state.showLoader} />
                <div className={ styles.pagination }>
                    <button
                        disabled={!this.state.page ? 'disabled' : ''}
                        onClick={this.backButtonClick.bind(this)}>
                            <span>&#10094;</span> {this.props.t('pages.reports.back')}
                        </button>
                    <button 
                        disabled={!this.state.transactions.length ? 'disabled' : ''}
                        onClick={this.forwardButtonClick.bind(this)}>
                            {this.props.t('pages.reports.forward')} <span>&#10095;</span>
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
)(withTranslation()(TransactionsAndReports));