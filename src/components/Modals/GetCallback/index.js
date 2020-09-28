import React from 'react';
import styles from './styles.scss';

// components
import Modal from '@components/Modal';
import { Trans, withTranslation } from 'react-i18next';

class GetCallback extends React.Component {
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
                                    Response
                                </Trans>
                            </span>
                        </div>

                        <div className={ styles.content }>

                            <div className={ styles.panel }>
                                <div className={ styles.panel_heading }>
                                    <h1>
                                        <Trans i18nKey="">
                                            Status code:
                                        </Trans>
                                    </h1>
                                </div>
                                <div className={ styles.panel_body }>
                                    <span>{ data.statusCode }</span>
                                </div>
                            </div>

                            <div className={ styles.panel }>
                                <div className={ styles.panel_heading }>
                                    <h1>
                                        <Trans i18nKey="">
                                            Body:
                                        </Trans>
                                    </h1>
                                </div>
                                <div className={ styles.panel_body }>
                                    <span>{ data.body }</span>
                                </div>
                            </div>

                            <div className={ styles.panel }>
                                <div className={ styles.panel_heading }>
                                    <h1>
                                        <Trans i18nKey="">
                                            Headers:
                                        </Trans>
                                    </h1>
                                </div>
                                <div className={ styles.panel_body }>
                                    <div className={ styles.list_group }>
                                        {data.headers?.map((header, index) => {
                                            return (
                                                <div key={ index }>
                                                    <h2>{ header.Key }</h2>
                                                    <p>{ header.Value }</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div className={ styles.panel }>
                                <div className={ styles.panel_heading }>
                                    <h1>
                                        <Trans i18nKey="">
                                            Cookies:
                                        </Trans>
                                    </h1>
                                </div>
                                <div className={ styles.panel_body }>
                                    <span></span>
                                </div>
                            </div>

                            <div className={ styles.panel }>
                                <div className={ styles.panel_heading }>
                                    <h1>
                                        <Trans i18nKey="">
                                            Response URI:
                                        </Trans>
                                    </h1>
                                </div>
                                <div className={ styles.panel_body }>
                                    <span>{ data.responseUri }</span>
                                </div>
                            </div>

                            <div className={ styles.panel }>
                                <div className={ styles.panel_heading }>
                                    <h1>
                                        <Trans i18nKey="">
                                            Server:
                                        </Trans>
                                    </h1>
                                </div>
                                <div className={ styles.panel_body }>
                                    <span>{ data.server }</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}

export default withTranslation()(GetCallback);