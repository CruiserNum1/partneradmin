import React, { Component } from 'react';
import LoginForm from '@components/LoginForm';
import styles from './styles.scss'
import { Trans } from 'react-i18next';

export default class extends Component {

    render () {
        return (
            <div className={ styles.wrapper }>
                <div className={ styles.btnsContainer }>
                    <h1>
                        <Trans i18nKey="auth.signIn">
                            Enter your partner details
                        </Trans>
                    </h1>
                </div>
                <LoginForm />
            </div>
        )
    }

}