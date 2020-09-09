import React from 'react';
import styles from './styles.scss';

import { withTranslation, Trans } from 'react-i18next';

class TransactionItem extends React.Component {
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
    
    render() {
        return (
            <React.Fragment>
                {/* this is for large screens */}
                <li className={ styles.transactionItem + ' ' + styles.largeScreen }>
                    <ul>
                        <li>{ this.props.item.userId }</li>
                        <li>{ this.props.item.transactionId }</li>
                        <li>{ this.props.item.status }</li>
                        <li>{ this.props.item.createdAt }</li>
                        <li>{ this.props.item.curIn }</li>
                        <li>{ this.props.item.curOut }</li>
                        <li>{ this.props.item.amountIn }</li>
                        <li>{ this.props.item.amountOut }</li>
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
                                    <span>{ this.props.item.requestId }</span><br />
                                    <button type={'button'} className={ styles.btn }>Callback</button>
                                </h1>
                            </div>
                            <div>
                                <h1>Extra status:</h1>
                                <span>{ this.props.item.extraStatus }</span>
                            </div>
                            <div>
                                <h1>Verify_info:</h1>
                                <button type={'button'} className={ styles.btn }>?</button>
                            </div>
                            <div>
                                <h1>RealAmountOut:</h1>
                                <span>{ this.props.item.realAmountOut }</span>
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
                                <span>{ this.props.item.reason }</span>
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
                                <span>{ this.props.item.couponCode }</span>
                            </div>
                            <div>
                                <h1>PartnerName:</h1>
                                <span>{ this.props.item.partnerName }</span>
                            </div>
                            <div>
                                <h1>In_convert_rate:</h1>
                                <span>{ this.props.item.in_convert_rate }</span>
                            </div>
                        </div>

                        {/* block4 */}
                        <div>
                            <div>
                                <h1>cashin_type:</h1>
                                <span>{ this.props.item.cashin_type }</span>
                            </div>
                        </div>
                    </div>
                </li>

                {/* this is for mobile screens */}
                <li className={ styles.transactionItem + ' ' + styles.mobileScreens }>
                    <ul>
                        <li>{ this.props.item.userId }</li>
                        <li>{ this.props.item.transactionId }</li>
                        <li>{ this.props.item.curIn }</li>
                        <li>{ this.props.item.amountIn }</li>
                        <li>{ this.props.item.status }</li>
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
                                    <span>{ this.props.item.requestId }</span><br />
                                    <button type={'button'} className={ styles.btn }>Callback</button>
                                </h1>
                            </div>
                            <div>
                                <h1>Extra status:</h1>
                                <h1>
                                    <span>{ this.props.item.requestId }</span>
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