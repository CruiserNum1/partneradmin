import React from 'react';
import { Trans } from 'react-i18next';
import styles from './styles.scss';

class FaqSection extends React.Component {
    render() {
        return (
            <div className={ styles.wrapper }>
                <h1 className={ styles.title }>
                    <Trans i18nKey="">
                        FAQ
                    </Trans>
                </h1>
                <div className={ styles.content }>
                    <h2>
                        <a href={'https://indacoin.com/api_doc'} target={'_blank'}>Indacoin Documentation and integration guide</a>
                    </h2>
                    <h2>
                        <a href={'https://indacoin.com/api_doc'} target={'_blank'}>Indacoin API Documentation</a>
                    </h2>

                    <div className={ styles.infoBlock }>
                        <h1>
                            <Trans i18nKey="">
                                Modification of the payment page design
                            </Trans>
                        </h1>
                        <span>
                            <Trans i18nKey="">
                                To change the design of the payment page the partner needs to upload the custom CSS file in his personal account. (https://indacoin.com/gw/partneradmin)
                            </Trans>
                        </span>
                    </div>

                    <div className={ styles.infoBlock }>
                        <h1>
                            <Trans i18nKey="">
                                Partner notification about payment completion - Callback
                            </Trans>
                        </h1>
                        <span>
                            <Trans i18nKey="">
                                After the payment confirmation, we will send you a callback to the address that has been designated in your personal account. (https://indacoin.com/gw/partneradmin)
                            </Trans>
                        </span>
                    </div>

                    <div className={ styles.infoBlock }>
                        <h1>
                            <Trans i18nKey="">
                                Creation of successful and failed payment pages on a partner platform
                            </Trans>
                        </h1>
                        <span>
                            <Trans i18nKey="">
                                The partner is capable to monitor the pages with successful and failed payments on his platform to where it will be redirected after the payment is processed. The links should be indicated in the personal account. (https://indacoin.com/gw/partneradmin)
                            </Trans>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default FaqSection;