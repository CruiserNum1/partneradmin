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

class Index extends React.Component {
    render() {
        return (
            <div className={ styles.wrapper }>
                <Header />
                <main>
                    <div className={ styles.container }>
                        <PartnerParams />
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