import React from 'react';
import styles from './styles.scss';

// components
import { Trans, withTranslation } from 'react-i18next';
import TransactionInfo from '@components/Modals/TransactionInfo';
import CurrenciesInput from '@components/CurrenciesInput/index.new';
import Loader from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';

// redux
import { connect } from 'react-redux';

// requests
import { createTransaction } from '@requests/partner/createTransaction';

class TransactionCreation extends React.Component {
    constructor(props) {
        super(props);

        this.currencies = this.getCurrencyList;
        this.initSearchValue  = '';
        this.currentCurrency  = null;

        this.createTransactionInstance = createTransaction.getInstance();
        this.dataObj = null;
        this.transactionResult = null;

        if (this.currencies.length > 0) {
            this.initSearchValue = this.currencies[0];
            this.currentCurrency = this.currencies[0];
        }

        this.state = {
            userId: '',
            currency: '',
            amount: '',
            currencyOut: '',
            targetAddress: '',
            showModal: false,
            isLoad: false,
            currenciesList: this.currencies, // currencies list for render
            searchValue: this.initSearchValue ,
            currentCurrency: this.currentCurrency,
            currentCurrencyNum: -1,
            isDeposit: false
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

        return <TransactionInfo
            dataObj={this.dataObj}
            trResult={this.transactionResult}
            open={this.state.showModal}
            setOpen={() => this.setState({ showModal: false })}
        />;
    }

    // currency list
    get getCurrencyList() {
        const getCashInfo = this.props.getCashInfo;
        if(getCashInfo) {
            try {
                const cashIn = getCashInfo.cashTypes.cashIn;
                let array = [];
                for(let key in cashIn) {
                    array.push(cashIn[key]);
                }
                return [...new Set(array.map(item => item.factCurrencyId))];
            } catch(e) {}
        }
    }

    // currency out list
    get getCurrencyOutList() {
        const mobgetcurrenciesinfo = this.props.mobgetcurrenciesinfo;
        if(mobgetcurrenciesinfo) {
            try {
                let items = mobgetcurrenciesinfo.result.filter(item => item.cur_id >= 100).map(item => item.short_name);
                return items;
            } catch(e) {
                console.log(e);
            }
        }
        return [];
    }

    onValueInputKeyPress(event) {
        const charCode = (event.which) ? event.which : event.keyCode;

        if (charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
            event.preventDefault();
            return false;
        }

        return true;
    }

    /**
     * By clicking on the send button
     *
     * @param target
     */
    onSubmit(target) {
        const { isDeposit } = this.state;
        let form = () => {
            let formObject = Object.assign(...[...target.querySelectorAll('input')].map(tag => new Object({[tag.dataset.key]:tag.value})));
            let spanQS = target.querySelectorAll(`span.${styles.error}`);
            let isValid = isDeposit ?
                    {
                        userId: formObject.userId,
                        currency: formObject.currency,
                        amount: formObject.amount
                    }
                    :
                    {
                        userId: formObject.userId,
                        currency: formObject.currency,
                        amount: formObject.amount,
                        currencyOut: formObject.currencyOut,
                        targetAddress: formObject.targetAddress,
                    };
            
            return {
                formObject: formObject,
                isValid: isValid,
                errorTag: spanQS
            }
        }

        let
            formObject = form().formObject,
            isValid = form().isValid,
            errSpan = form().errorTag;

        if(!Object.values(isValid).some(value => value.length === 0)) {
            this.setState({ isLoad: true });

            this.dataObj = {
                amount_in: formObject.amount,
                cur_in: formObject.currency,
                user_id: formObject.userId,
                coupon_code: ""
            };

            // if deposit
            this.dataObj['cur_out'] = isDeposit ? formObject.currency : formObject.currencyOut;
            this.dataObj['target_address'] = isDeposit ? "" : formObject.targetAddress;
            
            // create transaction request
            this.createTransactionInstance.request(this.dataObj);

            // response
            this.createTransactionInstance.response(data => {
                let result = data && data.d;
                if (result) {
                    try {
                        const txUrl = new URL(result);
                        this.transactionResult = result;
                        this.setState({ isLoad: false, showModal: true });
                    } catch (error) {
                        toast.error(result, {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true
                        });
                        this.setState({ isLoad: false });
                    }
                }
            });

        } else {
            if(!isValid.userId) {
                let span = [...errSpan].find(item => item.dataset.key === 'userId' && item);
                let input = document.querySelector(`form input[data-key="userId"]`);
                span.classList.add(styles.active);
                input.oninput = () => {
                    span.classList[form().isValid[input.dataset.key] ? 'remove' : 'add'](styles.active);
                }
            }

            if(!isValid.currency) {
                let span = [...errSpan].find(item => item.dataset.key === 'currency' && item);
                let input = document.querySelector(`form input[data-key="currency"]`);
                span.classList.add(styles.active);
                input.oninput = () => {
                    span.classList[form().isValid[input.dataset.key] ? 'remove' : 'add'](styles.active);
                }
            }

            if(!isValid.amount) {
                let span = [...errSpan].find(item => item.dataset.key === 'amount' && item);
                let input = document.querySelector(`form input[data-key="amount"]`);
                span.classList.add(styles.active);
                setInterval(() => {
                    span.classList[form().isValid[input.dataset.key] ? 'remove' : 'add'](styles.active);
                }, 500);
            }

            if(!isValid.currencyOut) {
                let span = [...errSpan].find(item => item.dataset.key === 'currencyOut' && item);
                let input = document.querySelector(`form input[data-key="currencyOut"]`);
                span.classList.add(styles.active);
                input.oninput = () => {
                    span.classList[form().isValid[input.dataset.key] ? 'remove' : 'add'](styles.active);
                }
            }

            if(!isValid.targetAddress) {
                let span = [...errSpan].find(item => item.dataset.key === 'targetAddress' && item);
                let input = document.querySelector(`form input[data-key="targetAddress"]`);
                span.classList.add(styles.active);
                setInterval(() => {
                    span.classList[form().isValid[input.dataset.key] ? 'remove' : 'add'](styles.active);
                }, 500);
            }
        }
    }

    render() {
        return (
            <div className={ styles.wrapper }>
                <ToastContainer />
                { this.renderModals() }

                <div className={ styles.isNeeded }>
                    <h1 className={ styles.title }>
                        <Trans i18nKey="">
                            Why is this needed?
                        </Trans>
                    </h1>
                    <p className={ styles.content }>
                        <Trans i18nKey="">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim nibh eros, in dictum velit feugiat non. Cras ac tortor euismod, vulputate lorem vel, pharetra ligula. Quisque eu massa ut lacus auctor rhoncus. Sed risus libero, finibus at tempus nec, sodales vitae mi. Maecenas sed suscipit urna, vel condimentum nisi. Pellentesque aliquet, lorem ut interdum eleifend, nulla urna consequat nibh, sed rhoncus nisi arcu in libero. Suspendisse eros elit, dignissim vel eros aliquet, lobortis placerat nibh.
                        </Trans>
                    </p>
                </div>

                <div className={ styles.creationContainer }>
                    <h1 className={ styles.title }>
                        <Trans i18nKey="pages.createTransaction.title">
                            Transaction creation
                        </Trans>
                    </h1>
                    <form onSubmit={ e => {e.preventDefault(); this.onSubmit(e.target);} }>
                        <ul>
                            <li>
                                <input data-key="userId" type="text" placeholder="UserID" />
                                <span data-key="userId" className={styles.error}>
                                    <Trans i18nKey="pages.createTransaction.fieldRequired">
                                        Input field is required
                                    </Trans>
                                </span>
                            </li>
                            <li>
                                <CurrenciesInput
                                    item={'currency'}
                                    placeholder={'Currency'}
                                    currencyList={ this.getCurrencyList }
                                    styles={ styles }
                                />
                            </li>
                            <li>
                                <input
                                    data-key="amount"
                                    type="text"
                                    placeholder="Amount"
                                    onKeyPress={ this.onValueInputKeyPress }
                                />
                                <span data-key="amount" className={styles.error}>
                                    <Trans i18nKey="pages.createTransaction.fieldRequired">
                                        Input field is required
                                    </Trans>
                                </span>
                            </li>
                            <div className={ styles.deposit }>
                                <input
                                    type={'checkbox'}
                                    id="deposit"
                                    value={this.state.isDeposit}
                                    onChange={(e) => this.setState({ isDeposit: e.target.checked})} />
                                <label htmlFor="deposit">{this.props.t('pages.createTransaction.depositScheme')}</label>
                            </div>
                            {
                                !this.state.isDeposit &&
                                <li>
                                    <CurrenciesInput
                                        item={'currencyOut'}
                                        placeholder={'Currency out'}
                                        currencyList={ this.getCurrencyOutList }
                                        styles={ styles }
                                    />
                                </li>
                            }
                            {
                                !this.state.isDeposit &&
                                <li>
                                    <input data-key="targetAddress" type="text" placeholder="Target address" />
                                    <span data-key="targetAddress" className={styles.error}>
                                        <Trans i18nKey="pages.createTransaction.fieldRequired">
                                            Input field is required
                                        </Trans>
                                    </span>
                                </li>
                            }
                            <li>
                                <button
                                    className={ styles.button }
                                    type={'submit'}
                                    disabled={this.state.isLoad}
                                >
                                    {
                                        this.state.isLoad
                                        ? <Loader type="TailSpin" className={styles.loader} color="#fff"/>
                                        : <Trans i18nKey="pages.createTransaction.createTransaction">
                                            Create Transaction
                                        </Trans>
                                    }
                                </button>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        mobgetcurrenciesinfo: state.mobgetcurrenciesinfo,
        getCashInfo: state.getCashInfo
    })
)(withTranslation()(TransactionCreation));