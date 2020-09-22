import React from 'react';
import styles from './styles.scss';

// components
import { withTranslation, Trans } from 'react-i18next';
import VerifyInfo from '@components/Modals/VerifyInfo';
import TargetAddress from '@components/Modals/TargetAddress';

class TransactionItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            type: null,
            showModal: false
        };
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

    /**
     * Render modals
     *
     * @return {*}
     */
    renderModals() {
        const { item } = this.props;

        switch(this.state.type) {
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

        return (
            <React.Fragment>
                { this.renderModals() }

                {/* this is for large screens */}
                <li className={ styles.transactionItem + ' ' + styles.largeScreen }>
                    <ul>
                        <li>{ item.userId }</li>
                        <li>{ item.transactionId }</li>
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
                                            <Trans i18nKey="tooltips.userId">
                                                UserID -  customer id in a seller system (string).
                                            </Trans>
                                        </span>
                                    </button>
                                :</h1>
                                <h1>
                                    <span>{ item.requestId }</span><br />
                                    <button type={'button'} className={ styles.btn }>Callback</button>
                                </h1>
                            </div>
                            <div>
                                <h1>Extra status:</h1>
                                <span>{ item.extraStatus }</span>
                            </div>
                            <div>
                                <h1>Verify_info:</h1>
                                <button
                                    type={'button'}
                                    className={ styles.btn }
                                    onClick={ () => this.setState({ type: 'verifyInfo', showModal: true }) }
                                >
                                    ?
                                </button>
                            </div>
                            <div>
                                <h1>RealAmountOut:</h1>
                                <span>{ item.realAmountOut }</span>
                            </div>
                        </div>

                        {/* block2 */}
                        <div>
                            <div>
                                <h1>TargetAddress:</h1>
                                <button
                                    type={'button'}
                                    className={ styles.btn }
                                    onClick={ () => this.setState({ type: 'targetAddress', showModal: true }) }
                                >
                                    ?
                                </button>
                            </div>
                            <div>
                                <h1>BlockchainHash:</h1>
                                <button type={'button'} className={ styles.btn }>?</button>
                            </div>
                            <div>
                                <h1>Link:</h1>
                                <button type={'button'} className={ styles.btn }>?</button>
                            </div>
                            <div>
                                <h1>Reason:</h1>
                                <span>{ item.reason }</span>
                            </div>
                        </div>

                        {/* block3 */}
                        <div>
                            <div>
                                <h1>Extra_info:</h1>
                                <span>value</span>
                            </div>
                            <div>
                                <h1>CouponCode:</h1>
                                <span>{ item.couponCode }</span>
                            </div>
                            <div>
                                <h1>PartnerName:</h1>
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
                        <li>{ item.transactionId }</li>
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
                                            <Trans i18nKey="tooltips.userId">
                                                UserID -  customer id in a seller system (string).
                                            </Trans>
                                        </span>
                                    </button>
                                :</h1>
                                <h1>
                                    <span>{ item.requestId }</span><br />
                                    <button type={'button'} className={ styles.btn }>Callback</button>
                                </h1>
                            </div>
                            <div>
                                <h1>Extra status:</h1>
                                <h1>
                                    <span>{ item.requestId }</span>
                                </h1>
                            </div>
                            <div>
                                <h1>Verify_info:</h1>
                                <button type={'button'} className={ styles.btn }>?</button>
                            </div>
                            <div>
                                <h1>RealAmountOut:</h1>
                                <span>95</span>
                            </div>
                        </div>

                        {/* block2 */}
                        <div>
                            <div>
                                <h1>TargetAddress:</h1>
                                <button type={'button'} className={ styles.btn }>?</button>
                            </div>
                            <div>
                                <h1>BlockchainHash:</h1>
                                <button type={'button'} className={ styles.btn }>?</button>
                            </div>
                            <div>
                                <h1>Link:</h1>
                                <button type={'button'} className={ styles.btn }>?</button>
                            </div>
                            <div>
                                <h1>Reason:</h1>
                                <span>value</span>
                            </div>
                        </div>

                        {/* block3 */}
                        <div>
                            <div>
                                <h1>Extra_info:</h1>
                                <span>value</span>
                            </div>
                            <div>
                                <h1>CouponCode:</h1>
                                <span>value</span>
                            </div>
                            <div>
                                <h1>PartnerName:</h1>
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
                                <h1>CreatedAt:</h1>
                                <span>value</span>
                            </div>
                            <div>
                                <h1>CurOut:</h1>
                                <span>BTC</span>
                            </div>
                            <div>
                                <h1>AmountOut:</h1>
                                <span>95</span>
                            </div>
                        </div>
                    </div>
                </li>
            </React.Fragment>
        );
    }
}

export default TransactionItem;