import React from "react";
import styles from './styles.scss';

// components
import Header from '@containers/Header';

// containers
import SettingsContainer from '@containers/SettingsContainer';

class Index extends React.Component {
    render() {
        return (
            <div className={ styles.wrapper }>
                <Header />
                <main>
                    <SettingsContainer />
                </main>
            </div>
        );
    }
}

export default Index;