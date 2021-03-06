import React from 'react';
import styles from './styles.scss';

// components
import Modal from '@components/Modal';
import Clipboard from '@tools/Clipboard';
import { Trans, withTranslation } from 'react-i18next';

const clipboard = Clipboard.getInstance();

class TargetAddress extends React.Component {
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
        const data = JSON.parse(this.props.data);

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
                            <b>Address: </b><span>{data.btcAddress}</span><br />
                            <button className={ styles.button } onClick={() => this.copyLink(data.btcAddress)}>
                                { this.props.t(`tooltips.${this.state.copyTxt}`) }
                            </button>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}

export default withTranslation()(TargetAddress);