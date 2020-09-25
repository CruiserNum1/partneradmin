import React from 'react';
import styles from './styles.scss';

// components
import Modal from '@components/Modal';
import { Trans, withTranslation } from 'react-i18next';

class GetUrl extends React.Component {
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
                                    URL
                                </Trans>
                            </span>
                        </div>

                        <div className={ styles.content }>
                            <b>Url: </b>
                            <span style={{ wordBreak: 'break-all' }}>
                                <a href={data} target={'_blank'} style={{ textDecoration: 'none' }}>{ data }</a>
                            </span>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}

export default withTranslation()(GetUrl);