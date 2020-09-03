// i18n
import i18next from "i18next";
import {initReactI18next} from "react-i18next";

// config
import i18nConfig from "@config/i18n.json";

export const DEFAULT_LANGUAGE = 'en';

/**
 * Get languages pattern
 *
 * @returns {string}
 */
export function languagesPattern() {
    let langPattern = '';

    for (let i = 0; i < i18nConfig.languages.length; i++) {

        langPattern += i18nConfig.languages[i].languageShort;

        if (i18nConfig.languages.length - 1 !== i) {
            langPattern += '|';
        }
    }

    return langPattern;
}

/**
 * Generate language url
 *
 * @param language
 * @returns {string}
 */
export function generateLanguageUrl(language) {
    return language;
}

/**
 * Chnage url with language
 *
 * @param currentLanguage
 * @param changeLanguage
 * @returns {*}
 */
export function changeUrl (currentLanguage, changeLanguage) {
    const currentLang = generateLanguageUrl(currentLanguage);
    const element = generateLanguageUrl(changeLanguage);

    if (element.toLowerCase() === currentLang.toLowerCase()) {
        return false;
    }

    const host = location.protocol + '//' + location.host;
    const pathname = location.pathname;
    let array = pathname.substr(env.BASE_PATH.length).split('/');

    if (array[0] === currentLang) {
        array[0] = element;

        if (changeLanguage === DEFAULT_LANGUAGE) {
            array.splice(0, 1);
        }
    } else {
        array.unshift(element);
    }

    return window.location.replace(host + env.BASE_PATH + array.join('/') + window.location.search);
}

export default () => {
    const resources = i18nConfig.languages.reduce((result, item) => {
        try {
            return Object.assign(result, {
                [item.languageShort]: {
                    translation: require(`@languages/${item.languageShort}.json`),
                }
            });
        } catch(e) {
            return result;
        }
    }, {});

    const obj = {
        resources: resources,
        lng: (window.localStorage.getItem('globalLanguage') || i18nConfig.default).toLowerCase(),
        fallbackLng: i18nConfig.default,
        interpolation: {
            escapeValue: false
        }
    };

    i18next.use(initReactI18next).init(obj);
}