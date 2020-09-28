import React from 'react';
import styles from './styles.scss';

// components
import Modal from '@components/Modal';
import Clipboard from '@tools/Clipboard';
import { Trans, withTranslation } from 'react-i18next';

const clipboard = Clipboard.getInstance();

class GetLink extends React.Component {
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
                                    Link
                                </Trans>
                            </span>
                        </div>

                        <div className={ styles.content }>
                            <b>Link: </b><span>{this.props.data}</span><br />
                            <button className={ styles.button } onClick={() => this.copyLink(this.props.data)}>
                                { this.props.t(`tooltips.${this.state.copyTxt}`) }
                            </button>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}

export default withTranslation()(GetLink);