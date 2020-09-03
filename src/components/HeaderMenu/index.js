import React from 'react';
import { Link } from 'react-router-dom';
import i18nConfig from '@config/i18n.json';
import styles from './styles.scss';
import { withTranslation, Trans } from 'react-i18next';
import MenuDropdown from "@components/MenuDropdown";

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.languages = i18nConfig.languages;

        this.state = {
            showLanguages: false,
            showMenu: false
        };

        this.refIgnoreSpan = React.createRef();
        this.refIgnoreImg = React.createRef();
    }

    /**
     * Show or hide menu
     */
    toggleMenu() {
        this.setState({
            showMenu: !this.state.showMenu
        }, () => document.body.style.overflowY = this.state.showMenu ? 'hidden' : 'auto');
    }

    render() {
        return (
            <div className={ styles.mainWrapper }>
                <div className={ styles.burger } onClick={ this.toggleMenu.bind(this) }>
                    <img src={ require('@images/burger.svg').default } />
                </div>
                <div className={ styles.wrapper + ' ' + (this.state.showMenu ? styles.show : '') }>
                    <div className={ styles.close + ' clearfix' }>
                        <img src={ require('@images/close.svg').default } onClick={ this.toggleMenu.bind(this) } />
                    </div>
                    <ul className={ styles.menu }>
                        <li>
                            <Link to={'dashboard'}>
                                <Trans i18nKey="header.menu.dashboard">
                                    Dashboard
                                </Trans>
                            </Link>
                        </li>
                        <li>
                            <Link to={'reports'}>
                                <Trans i18nKey="header.menu.reports">
                                    Reports
                                </Trans>
                            </Link>
                        </li>
                        <li>
                            <Link to={'create-transaction'}>
                                <Trans i18nKey="header.menu.createTransaction">
                                    Create Transaction
                                </Trans>
                            </Link>
                        </li>
                        <li>
                            <Link to={'settings'}>
                                <Trans i18nKey="header.menu.settings">
                                    Settings
                                </Trans>
                            </Link>
                        </li>
                        <li>
                            <Link to={'faq'}>
                                <Trans i18nKey="header.menu.faq">
                                    FAQ
                                </Trans>
                            </Link>
                        </li>
                        <li className={ styles.languageContainer }>
                            <span
                                ref={ this.refIgnoreSpan }
                                onClick={ () => this.setState({ showLanguages: !this.state.showLanguages }) }
                            >
                                { this.props.i18n.language.toUpperCase() }
                            </span>
                            <img
                                className={ styles.dropDown }
                                src={ require('@images/dropDown.svg').default }
                                ref={ this.refIgnoreImg }
                                onClick={ () => this.setState({ showLanguages: !this.state.showLanguages }) }
                            />
                            <MenuDropdown
                                className={ styles.MenuDropdown }
                                refIgnore={ [ this.refIgnoreSpan, this.refIgnoreImg ] }
                                items={ this.languages }
                                selected={(index) => {
                                    // this.changeLanguage(this.languages[index].languageShort.toLowerCase());
                                    this.props.i18n.changeLanguage(this.languages[index].languageShort.toLowerCase());
                                }}
                                visible={bool => bool === undefined ? this.state.showLanguages : this.setState({ showLanguages: bool })}
                                render={(value) => {
                                    let imgSrc;
                                    try {
                                        imgSrc = require(`@images/countries/${value.languageShort.toLowerCase()}.svg`).default;
                                    } catch(e) {
                                        imgSrc = null;
                                    }
                                    return (
                                        <div>
                                            {
                                                imgSrc && <img height={12} src={ imgSrc } alt={ value.country } />
                                            }
                                            <span>
                                                { value.languageShort.toUpperCase() }
                                            </span>
                                        </div>
                                    );
                                }}
                            />
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default withTranslation()(Header);