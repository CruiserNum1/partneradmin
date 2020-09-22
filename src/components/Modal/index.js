import React, { Component } from 'react';
import Modal from 'react-modal';
import styles from './styles.scss';
import settings from '@config/settings.json';

Modal.setAppElement(settings.rootElementSelector);

Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, .75)';
Modal.defaultStyles.overlay.zIndex = 2147483640;

const MODAL_LG = 'lg';
const MODAL_MD = 'md';

export default class extends Component {
    constructor (props) {
        super(props);

        this.className = styles.modal;

        if (typeof this.props.type !== 'undefined') {
            if (this.props.type === MODAL_LG) {
                this.className += ' ' + styles.lg;
            }

            if (this.props.type === MODAL_MD) {
                this.className += ' ' + styles.md;
            }
        }
    }

    render () {
        return (
            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={this.props.onRequestClose || null}
                className={this.className}
                styles={this.props.styles || {}}
            >
                <div className={ styles.container }>
                    { this.props.children }
                </div>
            </Modal>
        );
    }

}
