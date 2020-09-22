import React from 'react';
import styles from './styles.scss';

// components
import Modal from '@components/Modal';
import { Trans, withTranslation } from 'react-i18next';

class Exchange extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Modal
                    isOpen={ this.props.open }
                    type={'md'}
                >
                    <div className={ styles.wrapper }>
                        <div className={ styles.header }>
                            <button
                                onClick={(event) => {
                                    event.preventDefault();
                                    if (typeof this.props.setOpen !== 'undefined') {
                                        this.props.setOpen();
                                    }
                                }}>
                                    <img src={ require('@images/closeIcon.svg').default } />
                            </button>
                            <span className={ styles.title }>
                                <Trans i18nKey="">
                                    Exchange to BTC <br /> and withdraw
                                </Trans>
                            </span>
                        </div>

                        <div className={ styles.content }>
                            <div className={ styles.curInfo }>
                                1239$ - 0.1 BTC
                            </div>
                            <div className={ styles.inputBlock }>
                                <input placeholder="Enter address" />
                                <span>
                                    Available: 1.00000000 <span className={ styles.maximum }>Maximum</span>
                                </span>
                                <input placeholder="Amount" />
                            </div>
                            <button
                                className={ styles.button }
                            >
                                Withdraw
                            </button>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}

export default withTranslation()(Exchange);