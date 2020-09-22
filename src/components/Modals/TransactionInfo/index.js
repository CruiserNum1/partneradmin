import React from 'react';
import styles from './styles.scss';

// components
import Modal from '@components/Modal';
import Clipboard from '@tools/Clipboard';
import { Trans, withTranslation } from 'react-i18next';

const clipboard = Clipboard.getInstance();

class TransactionInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            copyTxt: 'copy'
        };
    }

    /**
     * Copy link
     */
    copyLink(text) {
        if (!text) {
            return;
        }

        clipboard.copy(text);
        this.setState({ copyTxt: 'copied' }, () => {
            setTimeout(() => this.setState({ copyTxt: 'copy' }), 2000);
        });
    }

    render() {
        const { dataObj, trResult } = this.props;

        return (
            <React.Fragment>
                <Modal
                    isOpen={ this.props.open }
                    type={'md'}
                >
                    <div className={ styles.wrapper }>
                        <div className={ styles.header }>
                            <span className={ styles.title }>
                                <Trans i18nKey="">
                                    Transaction successfully created!
                                </Trans>
                            </span>
                            {/* <button onClick={(event) => {
                                event.preventDefault();
                                if (typeof this.props.setOpen !== 'undefined') {
                                    this.props.setOpen();
                                }
                            }}>
                                <span>&times;</span>
                            </button> */}
                        </div>

                        <div className={ styles.content }>
                        <span>TransactionId - { dataObj?.user_id }</span><br />
                            <span>UserId - { dataObj?.user_id }</span><br />
                            <span>Amount - { dataObj?.amount_in }</span><br />
                            <span>CurrencyOut - { dataObj?.cur_out }</span><br />
                            <span>
                                TargetAddress - <br />{ dataObj?.target_address }
                                <button
                                    className={ styles.copyBtn }
                                    type="button"
                                    onClick={() => this.copyLink(dataObj?.target_address)}
                                >
                                    <img width="12" height="14" src={ require('@images/icons/doc.svg').default } />
                                    <span className={ styles.tooltiptext }>
                                        <Trans i18nKey={`tooltips.${this.state.copyTxt}`}>
                                            Copy
                                        </Trans>
                                    </span>
                                </button>
                            </span><br />
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                Link: 
                                <span
                                    style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                                >
                                    <a href={trResult} target={'_blank'}>{trResult}</a>
                                </span>
                                <button
                                    className={ styles.copyBtn }
                                    type="button"
                                    onClick={() => this.copyLink(trResult)}
                                >
                                    <img width="12" height="14" src={ require('@images/icons/doc.svg').default } />
                                    <span className={ styles.tooltiptext }>
                                        <Trans i18nKey={`tooltips.${this.state.copyTxt}`}>
                                            Copy
                                        </Trans>
                                    </span>
                                </button>
                            </div>
                            <br />
                            <button
                                className={ styles.button }
                                onClick={(event) => {
                                    event.preventDefault();
                                    if (typeof this.props.setOpen !== 'undefined') {
                                        this.props.setOpen();
                                    }
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}

export default withTranslation()(TransactionInfo);