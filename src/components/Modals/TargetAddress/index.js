import React from 'react';
import styles from './styles.scss';

// components
import Modal from '@components/Modal';
import { Trans, withTranslation } from 'react-i18next';

class TargetAddress extends React.Component {
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
                                    Target address
                                </Trans>
                            </span>
                        </div>

                        <div className={ styles.content }>
                            <b>Address: </b><span>{JSON.parse(this.props.data).btcAddress}</span><br />
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}

export default withTranslation()(TargetAddress);