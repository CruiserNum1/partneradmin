import React from 'react';
import styles from './styles.scss';

// components
import ContentLoader from 'react-content-loader';
import { withTranslation, Trans } from 'react-i18next';
import VerifyInfo from '@components/Modals/VerifyInfo';
import TargetAddress from '@components/Modals/TargetAddress';
import GetUrl from '@components/Modals/GetUrl';

// requests
import { getFullUrl } from '@requests/partner/getFullUrl';

const getFullUrlInstance = getFullUrl.getInstance();

class TransactionItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            type: null,
            showModal: false
        };

        this.getUrlResult = null;
    }

    showAnswerLarge(event) {
        event.target.classList.toggle(styles.show);
        let index = event.target.getAttribute("data-index");
        document.getElementById(`collapse_large_${index}`).classList.toggle(styles.show);
    }

    showAnswerMobile(event) {
        event.target.classList.toggle(styles.show);
        let index = event.target.getAttribute("data-index");
        document.getElementById(`collapse_mobile_${index}`).classList.toggle(styles.show);
    }

    getUrl() {
        let dataObj = {
            transactionId: this.props.item.transactionId
        };

        getFullUrlInstance.request(dataObj);
        getFullUrlInstance.response(res => {
            if (res?.d) {
                this.getUrlResult = res.d;
                this.setState({ type: 'getUrl', showModal: true });
            }
        })
    }

    /**
     * Render modals
     *
     * @return {*}
     */
    renderModals() {
        const { item } = this.props;

        switch(this.state.type) {
            case 'getUrl':
                return <GetUrl
                    data={this.getUrlResult}
                    open={this.state.showModal}
                    setOpen={() => this.setState({ showModal: false })}
                />;
            case 'verifyInfo':
                return <VerifyInfo
                    data={item.verify_info}
                    open={this.state.showModal}
                    setOpen={() => this.setState({ showModal: false })}
                />;
            case 'targetAddress':
                return <TargetAddress
                    data={item.targetAddress}
                    open={this.state.showModal}
                    setOpen={() => this.setState({ showModal: false })}
                />;
        }
    }

    render() {
        const { item } = this.props;

        if(this.props.showLoader) {
            return this.renderLoader();
        }

        return (
            <React.Fragment>
                { this.renderModals() }

                {/* this is for large screens */}
                <li className={ styles.transactionItem + ' ' + styles.largeScreen }>
                    <ul>
                        <li>{ item.userId }</li>
                        <li>
                            { item.transactionId }<br />
                            <button
                                style={{borderRadius: '12px', padding: '4px 8px', fontSize: '12px', fontWeight: '500', cursor: 'pointer', width: 'auto', height: 'auto'}}
                                className={ styles.btn }
                                onClick={this.getUrl.bind(this)}
                            >
                                Get URL
                            </button>
                        </li>
                        <li>{ item.status }</li>
                        <li>{ item.createdAt }</li>
                        <li>{ item.curIn }</li>
                        <li>{ item.curOut }</li>
                        <li>{ item.amountIn }</li>
                        <li>{ item.amountOut }</li>
                        <li className={ styles.arrowLi }>
                            <img 
                                src={ require('@images/arrow.svg').default }
                                data-index={ this.props.index }
                                onClick={ this.showAnswerLarge.bind(this) }
                            />
                        </li>
                    </ul>

                    {/* collapsible element */}
                    <div
                        className={ styles.collapseBlock }
                        id={ 'collapse_large_' + this.props.index }
                    >
                        {/* block_1 */}
                        <div>
                            <div>
                                <h1>RequestID <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.requestId">
                                                Id of best card payment attempt, can have many 3ds attempts
                                            </Trans>
                                        </span>
                                    </button>
                                :</h1>
                                <h1>
                                    <span>{ item.requestId }</span><br />
                                    <button type={'button'} className={ styles.btn + ' ' + styles.button }>Callback</button>
                                </h1>
                            </div>
                            <div>
                                <h1>Extra status <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.extraStatus">
                                                Status of best card payment attempt
                                            </Trans>
                                        </span>
                                    </button>
                                :</h1>
                                <span>{ item.extraStatus }</span>
                            </div>
                            <div>
                                <h1>Verify info <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.verifyInfo">
                                                KYC info of client if asked
                                            </Trans>
                                        </span>
                                    </button>
                                :</h1>
                                <button
                                    type={'button'}
                                    className={ styles.btn }
                                    onClick={ () => this.setState({ type: 'verifyInfo', showModal: true }) }
                                >
                                    ?
                                </button>
                            </div>
                            <div>
                                <h1>RealAmountOut <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.realAmountOut">
                                                Real amount of sent coins
                                            </Trans>
                                        </span>
                                    </button>
                                :</h1>
                                <span>{ item.realAmountOut }</span>
                            </div>
                        </div>

                        {/* block2 */}
                        <div>
                            <div>
                                <h1>TargetAddress <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.targetAddress">
                                                Withdrawal address
                                            </Trans>
                                        </span>
                                    </button>
                                :</h1>
                                <button
                                    type={'button'}
                                    className={ styles.btn }
                                    onClick={ () => this.setState({ type: 'targetAddress', showModal: true }) }
                                >
                                    ?
                                </button>
                            </div>
                            <div>
                                <h1>BlockchainHash <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.blockchainHash">
                                                Hash of withdrawal transaction in blockchain
                                            </Trans>
                                        </span>
                                    </button>
                                :</h1>
                                <button type={'button'} className={ styles.btn }>?</button>
                            </div>
                            <div>
                                <h1>Link <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.link">
                                                Link to transaction page in indacoin system
                                            </Trans>
                                        </span>
                                    </button>
                                :</h1>
                                <button type={'button'} className={ styles.btn }>?</button>
                            </div>
                            <div>
                                <h1>Reason <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.reason">
                                                Reason if transaction was declined
                                            </Trans>
                                        </span>
                                    </button>
                                :</h1>
                                <span>{ item.reason }</span>
                            </div>
                        </div>

                        {/* block3 */}
                        <div>
                            <div>
                                <h1>Extra info <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.extraInfo">
                                                Info that added in createTransaction method by partner
                                            </Trans>
                                        </span>
                                    </button>
                                :</h1>
                                <span>value</span>
                            </div>
                            <div>
                                <h1>CouponCode:</h1>
                                <span>{ item.couponCode }</span>
                            </div>
                            <div>
                                <h1>PartnerName <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.partnerName">
                                                Your partner name
                                            </Trans>
                                        </span>
                                    </button>
                                :</h1>
                                <span>{ item.partnerName }</span>
                            </div>
                            <div>
                                <h1>In_convert_rate:</h1>
                                <span>{ item.in_convert_rate }</span>
                            </div>
                        </div>

                        {/* block4 */}
                        <div>
                            <div>
                                <h1>cashin_type:</h1>
                                <span>{ item.cashin_type }</span>
                            </div>
                        </div>
                    </div>
                </li>

                {/* this is for mobile screens */}
                <li className={ styles.transactionItem + ' ' + styles.mobileScreens }>
                    <ul>
                        <li>{ item.userId }</li>
                        <li>
                            { item.transactionId }<br />
                            <button
                                style={{borderRadius: '12px', padding: '4px 8px', fontSize: '12px', fontWeight: '500', cursor: 'pointer', width: 'auto', height: 'auto'}}
                                className={ styles.btn }
                                onClick={this.getUrl.bind(this)}
                            >
                                Get URL
                            </button>
                        </li>
                        <li>{ item.curIn }</li>
                        <li>{ item.amountIn }</li>
                        <li>{ item.status }</li>
                        <li className={ styles.arrowLi }>
                            <img 
                                src={ require('@images/arrow.svg').default }
                                data-index={ this.props.index }
                                onClick={ this.showAnswerMobile.bind(this) }
                            />
                        </li>
                    </ul>

                    {/* collapsible element */}
                    <div
                        className={ styles.collapseBlock }
                        id={ 'collapse_mobile_' + this.props.index }
                    >
                        {/* block_1 */}
                        <div>
                            <div>
                                <h1>RequestID <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.requestId">
                                                Id of best card payment attempt, can have many 3ds attempts
                                            </Trans>
                                        </span>
                                    </button>
                                :</h1>
                                <h1>
                                    <span>{ item.requestId }</span><br />
                                    <button type={'button'} className={ styles.btn + ' ' + styles.button }>Callback</button>
                                </h1>
                            </div>
                            <div>
                                <h1>Extra status <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.extraStatus">
                                                Status of best card payment attempt
                                            </Trans>
                                        </span>
                                    </button>
                                :</h1>
                                <h1>
                                    <span>{ item.requestId }</span>
                                </h1>
                            </div>
                            <div>
                                <h1>Verify info <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.verifyInfo">
                                                KYC info of client if asked
                                            </Trans>
                                        </span>
                                    </button>
                                :</h1>
                                <button type={'button'} className={ styles.btn }>?</button>
                            </div>
                            <div>
                                <h1>RealAmountOut <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.realAmountOut">
                                                Real amount of sent coins
                                            </Trans>
                                        </span>
                                    </button>
                                :</h1>
                                <span>95</span>
                            </div>
                        </div>

                        {/* block2 */}
                        <div>
                            <div>
                                <h1>TargetAddress <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.targetAddress">
                                                Withdrawal address
                                            </Trans>
                                        </span>
                                    </button>
                                :</h1>
                                <button type={'button'} className={ styles.btn }>?</button>
                            </div>
                            <div>
                                <h1>BlockchainHash <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.blockchainHash">
                                                Hash of withdrawal transaction in blockchain
                                            </Trans>
                                        </span>
                                    </button>
                                :</h1>
                                <button type={'button'} className={ styles.btn }>?</button>
                            </div>
                            <div>
                                <h1>Link <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.link">
                                                Link to transaction page in indacoin system
                                            </Trans>
                                        </span>
                                    </button>
                                :</h1>
                                <button type={'button'} className={ styles.btn }>?</button>
                            </div>
                            <div>
                                <h1>Reason <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.reason">
                                                Reason if transaction was declined
                                            </Trans>
                                        </span>
                                    </button>
                                :</h1>
                                <span>value</span>
                            </div>
                        </div>

                        {/* block3 */}
                        <div>
                            <div>
                                <h1>Extra info <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.extraInfo">
                                                Info that added in createTransaction method by partner
                                            </Trans>
                                        </span>
                                    </button>
                                :</h1>
                                <span>value</span>
                            </div>
                            <div>
                                <h1>CouponCode:</h1>
                                <span>value</span>
                            </div>
                            <div>
                                <h1>PartnerName <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.partnerName">
                                                Your partner name
                                            </Trans>
                                        </span>
                                    </button>
                                :</h1>
                                <span>value</span>
                            </div>
                            <div>
                                <h1>In_convert_rate:</h1>
                                <span>value</span>
                            </div>
                        </div>

                        {/* block4 */}
                        <div>
                            <div>
                                <h1>cashin_type:</h1>
                                <span>value</span>
                            </div>
                            <div>
                                <h1>CreatedAt <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.createdAt">
                                                Time of transaction creation
                                            </Trans>
                                        </span>
                                    </button>
                                :</h1>
                                <span>value</span>
                            </div>
                            <div>
                                <h1>CurOut <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.curOut">
                                                Currency to get after transaction
                                            </Trans>
                                        </span>
                                    </button>
                                :</h1>
                                <span>BTC</span>
                            </div>
                            <div>
                                <h1>AmountOut <button className={ styles.btn + ' ' + styles.tooltipBtn }>?
                                        <span className={ styles.tooltiptext }>
                                            <Trans i18nKey="tooltips.amountOut">
                                                Amount will be received
                                            </Trans>
                                        </span>
                                    </button>
                                :</h1>
                                <span>95</span>
                            </div>
                        </div>
                    </div>
                </li>
            </React.Fragment>
        );
    }

    renderLoader() {
        return (
            <li className={ styles.transactionItem + ' ' + styles.renderLoader }>
                <ul>
                    { new Array(10).fill(1).map((value, index) => {
                        return (
                            <li key={index}>
                                <ContentLoader className={styles.loader}>
                                    <rect x="0" y="0" rx="5" ry="5" width="170" />
                                </ContentLoader>
                            </li>
                        );
                    }) }
                </ul>
            </li>
        );
    }
}

export default withTranslation()(TransactionItem);