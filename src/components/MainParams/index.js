import React from 'react';
import styles from './styles.scss';

import { Trans, withTranslation } from 'react-i18next';
import { getMonth } from './getMonth';

// redux
import { connect } from 'react-redux';

class MainParams extends React.Component {
    get enabledTill() {
        let date = new Date(parseInt(this.props.mainParams.enabledTill.slice(6, -2)));
        return `${date.getDate()} ${getMonth(date.getMonth())} ${date.getFullYear()}`;
    }

    render() {
        return (
            <div className={ styles.wrapper }>
                <div className={ styles.partner }>
                    <img src={ require('@images/partnerLogo.svg').default } />
                    <span><b>Partner name: </b>{this.props.partnerName}</span>
                    <span>{ this.props.t('partner.enabledTill') }<br />{ this.enabledTill }</span>
                    <span>
                        <Trans i18nKey="partner.partnerProfit">
                            Partner profit - <b>{{ procent: '3%' }}</b>
                        </Trans>
                    </span>
                    <span>
                        <Trans i18nKey="partner.finalCommission">
                            Final commission for the buyer - <b>{{ procent: '10%' }}</b>
                        </Trans>
                    </span>
                </div>
                <div className={ styles.card }>
                    <div>
                        <div>
                            <img src={ require('@images/balance.svg').default } />
                            <h1>{ this.props.t('partner.balance') }</h1>
                        </div>
                        <span><h1>1239$</h1>10860$ was paid</span>
                    </div>
                </div>

                {/* modal callback */}
                {
                    this.props.exchangeCallback &&
                    <a href="https://indacoin.com/auth/login" target={'_blank'} style={{ textDecoration: 'none', display: 'block', marginBottom: '20px' }}>
                        <div
                            className={ styles.modalBlock }
                            // onClick={this.props.exchangeCallback} - if exchange callback
                        >
                            <Trans i18nKey="pages.settings.exchangeToBtc">
                                Exchange to BTC and withdraw
                            </Trans>
                        </div>
                    </a>
                }

                <div className={ styles.card }>
                    <div>
                        <div>
                            <img src={ require('@images/bitcoin.svg').default } />
                            <h1>{ this.props.t('partner.bitcoinRate') }</h1>
                        </div>
                        <h1>9652$</h1>
                    </div>
                </div>
                <div className={ styles.card }>
                    <div>
                        <div>
                            <img src={ require('@images/income.svg').default } />
                            <h1>{ this.props.t('partner.yourIncome') }</h1>
                        </div>
                        <span><h1>100 transactions</h1><h1>1000 USD=0.2 BTC</h1></span>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        partnerName: state.partnerName,
        mainParams: state.mainParams
    }),
    null
)(withTranslation()(MainParams));