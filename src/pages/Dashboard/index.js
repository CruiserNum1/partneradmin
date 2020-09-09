// tools
import React from "react";
import { withTranslation, Trans } from 'react-i18next';
import styles from './styles.scss';

// components
import Header from '@containers/Header';
import PartnerParams from '@containers/PartnerParams';
import PartnerTransactions from '@containers/PartnerTransactions';

// redux
import { connect } from 'react-redux';

// data
import data from '../../data.json';

class Index extends React.Component {
    componentDidMount() {
        console.log(this.props.mainParams);
        console.log(JSON.parse(this.props.transactions.Item1));
    }
    
    render() {
        return (
            <div className={ styles.wrapper }>
                <Header />
                <main>
                    <div className={ styles.container }>
                        <PartnerParams data={ data.GetMainParams.d } />
                        <PartnerTransactions />
                    </div>
                </main>
            </div>
        );
    }
}

export default connect(
	state => ({
        mainParams: state.mainParams,
        transactions: state.transactions
	}),
	null
)(withTranslation()(Index));