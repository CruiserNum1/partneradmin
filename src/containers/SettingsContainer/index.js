import React from 'react';
import styles from './styles.scss';

// components
import MainParams from '@components/MainParams';
import PartnerSettings from '@components/PartnerSettings';
import Exchange from '@components/Modals/Exchange';

class SettingsContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        };
    }

    /**
     * Render modals
     *
     * @return {*}
     */
    renderModals() {
        if (!this.state.showModal) {
            return null;
        }

        return <Exchange
            open={this.state.showModal}
            setOpen={() => this.setState({ showModal: false })}
        />;
    }

    exchangeCallback() {
        this.setState({ showModal: true });
    }

    render() {
        return (
            <div className={ styles.wrapper }>
                { this.renderModals() }
                <div className={ styles.settings + ' ' + styles.container }>
                    <MainParams exchangeCallback={ this.exchangeCallback.bind(this) } />
                    <PartnerSettings />
                </div>
            </div>
        );
    }
}

export default SettingsContainer;