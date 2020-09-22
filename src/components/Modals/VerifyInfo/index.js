import React from 'react';
import styles from './styles.scss';

// components
import Modal from '@components/Modal';
import { Trans, withTranslation } from 'react-i18next';

class VerifyInfo extends React.Component {
    render() {
        const { data } = this.props;

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
                                    Verify info
                                </Trans>
                            </span>
                        </div>

                        <div className={ styles.content }>
                            <ul>
                                {
                                    Object.keys(data).map((key, index) => {
                                        return <li key={index}><b>{key}</b> - {data[key]}</li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}

export default withTranslation()(VerifyInfo);