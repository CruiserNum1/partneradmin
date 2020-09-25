import React from 'react';
import styles from './styles.scss';

import { withTranslation, Trans } from 'react-i18next';

// components
import TransactionItem from '@components/TransactionItem';

class Transactions extends React.Component {
    render() {
        console.log(this.props.transactions);
        return (
            <div className={ styles.wrapper }>
                <div className={ styles.detailsTitle }>
                    <span>
                        <Trans i18nKey="pages.dashboard.transactions.sort">
                            Click on the desired option to sort.<br />
                            To see all the options, click on the arrow.
                        </Trans>
                    </span>
                </div>
                <div>
                    <ol className={ styles.table }>
                        
                        {/* this is for large screens */}
                        <li className={ styles.largeScreens }>
                            <ul>
                                <li>
                                    <Trans i18nKey="">
                                        UserId
                                    </Trans>
                                    <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.userId">
                                                UserID -  customer id in a seller system (string).
                                            </Trans>
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <Trans i18nKey="">
                                        TransactionId
                                    </Trans>
                                    <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.transactionId">
                                                Transaction id you got in createTransaction method, one this id can have many requests (card payment attempts)
                                            </Trans>
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <Trans i18nKey="">
                                        Status
                                    </Trans>
                                    <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.status">
                                                Status of transaction, is choosing like the best from all requests
                                            </Trans>
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <Trans i18nKey="">
                                        CreatedAt
                                    </Trans>
                                    <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.createdAt">
                                                Time of transaction creation
                                            </Trans>
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <Trans i18nKey="">
                                        CurIn
                                    </Trans>
                                    <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.curIn">
                                                Currency to pay
                                            </Trans>
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <Trans i18nKey="">
                                        CurOut
                                    </Trans>
                                    <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.curOut">
                                                Currency to get after transaction
                                            </Trans>
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <Trans i18nKey="">
                                        AmountIn
                                    </Trans>
                                    <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.amountIn">
                                                Amount to pay
                                            </Trans>
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <Trans i18nKey="">
                                        AmountOut
                                    </Trans>
                                    <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.amountOut">
                                                Amount will be received
                                            </Trans>
                                        </span>
                                    </button>
                                </li>
                                <li></li>
                            </ul>
                        </li>

                        {/* this is for mobile screens */}
                        <li className={ styles.mobileScreens }>
                            <ul>
                                <li>
                                    <Trans i18nKey="">
                                        UserId
                                    </Trans>
                                    <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.userId">
                                                UserID -  customer id in a seller system (string).
                                            </Trans>
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <Trans i18nKey="">
                                        TransactionId
                                    </Trans>
                                    <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.transactionId">
                                                Transaction id you got in createTransaction method, one this id can have many requests (card payment attempts)
                                            </Trans>
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <Trans i18nKey="">
                                        CurIn
                                    </Trans>
                                    <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.curIn">
                                                Currency to pay
                                            </Trans>
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <Trans i18nKey="">
                                        AmountIn
                                    </Trans>
                                    <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.amountIn">
                                                Amount to pay
                                            </Trans>
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <Trans i18nKey="">
                                        Status
                                    </Trans>
                                    <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.status">
                                                Status of transaction, is choosing like the best from all requests
                                            </Trans>
                                        </span>
                                    </button>
                                </li>
                                <li></li>
                            </ul>
                        </li>

                        {
                            this.props.transactions?.map((value, index) => {
                                return (
                                    <TransactionItem
                                        key={ index }
                                        item={ value }
                                        index={ index }
                                        showLoader={this.props.showLoader}
                                    />
                                );
                            })
                        }
                    </ol>
                </div>
            </div>
        );
    }
}

export default withTranslation()(Transactions);