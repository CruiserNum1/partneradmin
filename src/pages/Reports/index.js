// tools
import React from "react";
import styles from './styles.scss';
import { withTranslation, Trans } from 'react-i18next';

// components
import Header from '@containers/Header';
import TransactionsAndReports from '@containers/TransactionsAndReports';

class Index extends React.Component {
    render() {
        return (
            <div className={ styles.wrapper }>
                <Header />
                <main>
                    <div className={ styles.container }>
                        <TransactionsAndReports />
                    </div>
                </main>
            </div>
        );
    }
}

export default withTranslation()(Index);