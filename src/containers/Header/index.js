import React from 'react';
import Logo from '@components/HeaderLogo';
import Menu from '@components/HeaderMenu';
import styles from './styles.scss';

export default class extends React.Component {
    render() {
        return (
            <header className={ styles.header }>
                <div className={ styles.wrapper + ' ' + styles.container }>
                    <Logo />
                    <Menu />
                </div>
            </header>
        );
    }
}