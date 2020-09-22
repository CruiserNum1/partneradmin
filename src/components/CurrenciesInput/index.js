import React from 'react';

// components
import { Trans } from 'react-i18next';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.currencies = this.props.currencyList;
        this.initSearchValue  = '';
        this.currentCurrency  = null;

        if (this.currencies.length > 0) {
            this.initSearchValue = this.currencies[0];
            this.currentCurrency = this.currencies[0];
        }

        this.state = {
            currency: '',
            currenciesList: this.currencies, // currencies list for render
            searchValue: this.initSearchValue,
            currentCurrency: this.currentCurrency,
            currentCurrencyNum: -1,
        };

        this.spanRef = React.createRef();
    }

    /**
     * function of opening / closing the drop-down list
     *
     * @param target
     */
    dropDown(target) {
        const { styles } = this.props;

        let droplistDisabledAll = () => {
            let droplistAll = document.querySelectorAll(`form ul.${styles.dropDown}`);
            for(let droplist of droplistAll) {
                droplist.style.height = 0;
            }
            document.onclick = null;
        }

        let droplistEnabled = () => {
            let droplist = document.querySelector(`form ul#${target.dataset.droplistName}`);
            if(!Number(droplist.style.height.replace(/\D+/,''))) {
                droplistDisabledAll();
                document.onclick = droplistDisabledAll;
                droplist.style.height = '200px';
                droplist.style.overflowY = 'auto';
            }
        }

        document.onclick = droplistDisabledAll;
        droplistEnabled();
    }

    /**
     * Transferring a selection from a list to the input field
     * inner animated text
     *
     * @param obj
     */
    inputValue(obj) {
        let
            str = obj[Object.keys(obj)],
            newStr = '',
            arr = str.split('');
        for(let i = 0; str.length > i; i++) {
            setTimeout(() => {
                this.setState({
                    [Object.keys(obj)]: newStr += arr[i]
                });
            },i*100);
        }

        this.spanRef.classList['remove'](this.props.styles.active);
    }

    render() {
        const { styles, item, placeholder } = this.props;

        return (
            <React.Fragment>
                <input
                    data-key={item}
                    className={styles.dropList}
                    value={this.state.currency}
                    onChange={e => this.setState({ currency: e.target.value })}
                    type="text"
                    placeholder={placeholder}
                    data-droplist-name={item}
                    onClick={e => this.dropDown(e.target)}
                />
                <span data-key={item} ref={ref => this.spanRef = ref} className={styles.error}>
                    <Trans i18nKey="listing.form.fieldRequired">
                        Input field is required
                    </Trans>
                </span>
                <ul id={item} className={styles.dropDown}>
                    {
                        this.state.currenciesList.map((value, index) => {
                            return (
                                <li
                                    key={index}
                                    onClick={() => this.inputValue({ currency: value })}
                                >
                                    { value }
                                </li>
                            );
                        })
                    }
                </ul>
            </React.Fragment>
        );
    }
}