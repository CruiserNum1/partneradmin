// tools
import React from "react";
import { withTranslation, Trans } from 'react-i18next';
import styles from './styles.scss';

// components
import Header from '@containers/Header';
import PartnerParams from '@containers/PartnerParams';
import PartnerTransactions from '@containers/PartnerTransactions';

// data
import data from '../../data.json';

class Index extends React.Component {
    render() {
        return (
            <div className={ styles.wrapper }>
                <Header />
                <main>
                    <div className={ styles.container }>
                        <PartnerParams data={ data.GetMainParams.d } />
                        <PartnerTransactions data={ data.GetTransactions.d } />
                    </div>
                </main>
            </div>
        );
    }
}

export default withTranslation()(Index);