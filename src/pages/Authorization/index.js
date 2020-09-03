import React, { Component } from 'react';
import styles from './styles.scss';

// components
import Header from '@containers/Header';
import AuthorizationForms from '@containers/AuthorizationForms';

export default class extends Component {
    render() {
        return (
            <div className={ styles.wrapper }>
                <Header />
                <main className={ styles.main }>
                    <AuthorizationForms />
                </main>
            </div>
        );
    }
}
