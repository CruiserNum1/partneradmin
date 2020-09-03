import React from 'react';
import styles from './styles.scss';

import { withTranslation } from 'react-i18next';

class MainParams extends React.Component {
    render() {
        return (
            <div className={ styles.wrapper }>
                <div className={ styles.partner }>
                    <img src={ require('@images/partnerLogo.svg').default } />
                    <h1>PartnerName</h1>
                    <span>{ this.props.t('partner.enabledTill') }<br />20 March 2020</span>
                    <span>{ this.props.t('partner.partnerProfit') }<b>3%</b></span>
                    <span>{ this.props.t('partner.finalCommission') }<b>10%</b></span>
                </div>
                <div className={ styles.card + ' ' + styles.balance }>
                    <div>
                        <div>
                            <img src={ require('@images/bitcoin.svg').default } />
                            <h1>{ this.props.t('partner.balance') }</h1>
                        </div>
                        <span><h1>1239$</h1>10860$ was paid</span>
                    </div>
                </div>
                <div className={ styles.card + ' ' + styles.bitcoinRate }>
                    <div>
                        <div>
                            <img src={ require('@images/bitcoin.svg').default } />
                            <h1>{ this.props.t('partner.bitcoinRate') }</h1>
                        </div>
                        <h1>9652$</h1>
                    </div>
                </div>
                <div className={ styles.card + ' ' + styles.income }>
                    <div>
                        <div>
                            <img src={ require('@images/bitcoin.svg').default } />
                            <h1>{ this.props.t('partner.yourIncome') }</h1>
                        </div>
                        <span><h1>100 transactions</h1><h1>1000 USD=0.2 BTC</h1></span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(MainParams);