import React from 'react';

// components
import { Trans } from 'react-i18next';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.currencies = this.props.currencyList;
        this.initCurrencyValue  = '';
        this.currentCurrency  = null;

        if (this.currencies.length > 0) {
            this.initCurrencyValue = this.currencies[0];
            this.currentCurrency = this.currencies[0];
        }

        this.state = {
            currency: this.initCurrencyValue,
            currenciesList: this.currencies, // currencies list for render
            currentCurrency: this.currentCurrency,
            currentCurrencyNum: -1,
        };

        this.spanRef = React.createRef();
        this.currenciesListRef = React.createRef();
    }

    /**
     * Filter coins
     *
     * @param {object} value
     */
    changeSearch(value) {

        const filtered = this.currencies.filter((element) => {
            return element.toUpperCase().indexOf(value.toUpperCase()) !== -1;
        });


        this.setState({
            currency: value,
            currenciesList: filtered,
        });
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

    /**
     * On search input keyDown handler
     *
     * @param event
     */
    onSearchInputKeyDown(event) {
        const charCode = (event.which) ? event.which : event.keyCode;

        if (charCode === 40) {
            // ArrowDown
            event.preventDefault();
            if ((this.state.currenciesList.length - 1) > this.state.currentCurrencyNum) {
                this.setState((prevState) => {
                    return {
                        currentCurrencyNum: ++prevState.currentCurrencyNum
                    }
                }, () => {
                    this.scrollCurrenciesContainer(true);
                })
            }
        }

        if (charCode === 38) {
            // ArrowUp
            event.preventDefault();
            if (this.state.currenciesList.length !== 0 && this.state.currentCurrencyNum !== -1) {
                this.setState((prevState) => {
                    return {
                        currentCurrencyNum: --prevState.currentCurrencyNum
                    }
                }, () => {
                    this.scrollCurrenciesContainer(false);
                })
            }
        }

        if (charCode === 8) {
            this.setState({
                currentCurrencyNum: -1,
            }, () => {
                this.currenciesListRef.scroll({
                    top: 0,
                });
            })
        }
    }

    /**
     * Scroll currencies container
     *
     * @param down
     */
    scrollCurrenciesContainer(down) {
        if (this.state.currentCurrencyNum === -1) {
            return;
        }

        const infelicity = 10;
        let containerHeight = this.currenciesListRef.offsetHeight;
        let containerScrollTop = this.currenciesListRef.scrollTop;
        let buttonHeight = 0;
        let buttonOffsetTop = 0;

        this.currenciesListRef.childNodes.forEach((element, index) => {
            if (index === this.state.currentCurrencyNum) {
                buttonHeight = element.offsetHeight;
                buttonOffsetTop = element.offsetTop;
            }
        });

        if (down && (containerHeight + infelicity) <= (buttonOffsetTop + buttonHeight)) {
            this.currenciesListRef.scroll({
                top: (buttonOffsetTop - containerHeight) + buttonHeight,
            })
        }

        if (!down && (containerScrollTop + infelicity) > (buttonOffsetTop + buttonHeight)) {
            this.currenciesListRef.scroll({
                top: buttonOffsetTop,
            })
        }
    }

    /**
     * Search input key press handler
     *
     * @param event
     */
    onSearchInputKeyPress(event) {
        const charCode = (event.which) ? event.which : event.keyCode;

        if (charCode === 13) {
            // detect Enter charCode
            event.preventDefault();

            let currentCurrencyIndex = this.state.currentCurrencyNum !== -1 ? this.state.currentCurrencyNum : 0;

            if (this.state.currenciesList.length >= (currentCurrencyIndex + 1)) {
                this.inputValue({ currency: this.state.currenciesList[currentCurrencyIndex] });
                this.currenciesListRef.style.height = '0';
            }

            return;
        }

        if (
            (charCode < 65 || charCode > 90) &&
            (charCode < 97 || charCode > 122) &&
            (charCode < 48 || charCode > 57)
        ) {
            event.preventDefault();
            return false;
        }

        this.setState({
            currentCurrencyNum: -1,
        }, () => {
            this.currenciesListRef.scroll({
                top: 0,
            });
        })
    }

    render() {
        const { styles, item, placeholder } = this.props;

        return (
            <React.Fragment>
                <input
                    data-key={item}
                    className={styles.dropList}
                    value={this.state.currency}
                    onKeyPress={this.onSearchInputKeyPress.bind(this)}
                    onKeyDown={this.onSearchInputKeyDown.bind(this)}
                    onChange={(event) => {
                        this.changeSearch(event.target.value);
                    }}
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
                <ul id={item} className={styles.dropDown} ref={ref => this.currenciesListRef = ref}>
                    {
                        this.state.currenciesList.map((value, index) => {
                            return (
                                <li
                                    key={index}
                                    className={(this.state.currentCurrencyNum === index ? styles.current : '')}
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