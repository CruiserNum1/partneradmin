import React from 'react';
import styles from './styles.scss';

import { withTranslation, Trans } from 'react-i18next';

// components
import TransactionItem from '@components/TransactionItem';

class Transactions extends React.Component {
    render() {
        return (
            <div className={ styles.wrapper }>
                <div className={ styles.detailsTitle }>
                    <span>
                        Click on the desired option to sort.<br />
                        To see all the options, click on the arrow.
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
                                </li>
                                <li>
                                    <Trans i18nKey="">
                                        TransactionId
                                    </Trans>
                                </li>
                                <li>
                                    <Trans i18nKey="">
                                        Status
                                    </Trans>
                                </li>
                                <li>
                                    <Trans i18nKey="">
                                        CreatedAt
                                    </Trans>
                                </li>
                                <li>
                                    <Trans i18nKey="">
                                        CurIn
                                    </Trans>
                                </li>
                                <li>
                                    <Trans i18nKey="">
                                        CurOut
                                    </Trans>
                                </li>
                                <li>
                                    <Trans i18nKey="">
                                        AmountIn
                                    </Trans>
                                </li>
                                <li>
                                    <Trans i18nKey="">
                                        AmountOut
                                    </Trans>
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
                                </li>
                                <li>
                                    <Trans i18nKey="">
                                        TransactionId
                                    </Trans>
                                </li>
                                <li>
                                    <Trans i18nKey="">
                                        CurIn
                                    </Trans>
                                </li>
                                <li>
                                    <Trans i18nKey="">
                                        AmountIn
                                    </Trans>
                                </li>
                                <li>
                                    <Trans i18nKey="">
                                        Status
                                    </Trans>
                                </li>
                                <li></li>
                            </ul>
                        </li>

                        {
                            this.props.data?.map((value, index) => {
                                return (
                                    <TransactionItem
                                        key={ index }
                                        item={ value }
                                        index={ index }
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