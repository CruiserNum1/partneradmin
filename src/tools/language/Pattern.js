// tools
import React from 'react';

// i18n
import { withTranslation } from "react-i18next";

// config
import i18nConfig from "@config/i18n.json";

class Pattern extends React.Component {
    constructor() {
        super();

        this.state = {
            saveLang: null,
        };
    }

    componentDidMount() {
        this.pattern();
    }

    componentDidUpdate() {
        this.pattern();
    }

    pattern() {
        const {i18n} = this.props;
        const language = i18n.language;
        const localStorage = window.localStorage.getItem('language');

        const getLang = language || localStorage || i18nConfig.default;
        if(getLang !== localStorage) {
            window.localStorage.setItem('language', getLang);
        }

        if(getLang !== this.state.saveLang) {
            const some = item => i18nConfig.languages.some(itemI18n => itemI18n.languageShort === item);
            const pathname = window.location.pathname;
            const pathnameSplit = pathname.split('/');
            const pathnameMap = pathnameSplit.map((item) => {
                if(some(item)) {
                    return getLang;
                }
                return item;
            });
            const pathnameFilter = pathnameMap.filter((item) => {
                if(
                    `/${item}/` === env.BASE_PATH
                    || item === ''
                    || some(item)
                ) {
                    return false;
                }
                return true;
            });

            const url = `${window.location.origin}${env.BASE_PATH}${getLang}${pathnameFilter.length && '/' || ''}${pathnameFilter.join('/')}${window.location.search}`;
            window.history.replaceState(null, document.title, url);

            this.setState({saveLang: getLang}, () => {
                const newpattern = this.props.newpattern;
                if(typeof newpattern === 'function') {
                    newpattern(getLang);
                }
            });
        }

    }

    render() {
        return this.props.children;
    }
}

export default withTranslation()(Pattern);