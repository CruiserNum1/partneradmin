import React from 'react';
import styles from './styles.scss';

// components
import { withTranslation } from 'react-i18next';
import Loader from 'react-loader-spinner';

// redux
import {connect} from "react-redux";
import action_partnerLogin from "@redux/actions/authorization/login";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            passwordInputType: 'password',
            isLoad: false,
            partnerName: {
                value: '',
                errors: []
            },
            secret: {
                value: '',
                errors: []
            }
        };
    }

    /**
     * Toggle password input type (password, text)
     *
     * @param event
     */
    togglePasswordInput (event) {
        event.preventDefault();

        this.setState({
            passwordInputType: this.state.passwordInputType === 'password' ? 'text' : 'password',
        });
    }

    /**
     * On form submit
     * @param event
     */
    onSubmit(event) {
        event.preventDefault();

        // first check
        let partnerErrors = [];
        let secretErrors = [];

        // email validation
        if (this.state.partnerName.value.length === 0) {
            partnerErrors.push(this.props.t('validation.requiredField'));
        }

        // password validation
        if (this.state.secret.value.length === 0) {
            secretErrors.push(this.props.t('validation.requiredField'));
        }

        if (partnerErrors.length || secretErrors.length) {
            return this.setState({
                partnerName: {
                    value: this.state.partnerName.value,
                    errors: partnerErrors,
                },
                secret: {
                    value: this.state.secret.value,
                    errors: secretErrors,
                }
            });
        }

        return this.setState({ isLoad: true }, () => {
            this.sendRequest(this.state.partnerName.value, this.state.secret.value);
        });
    }

    sendRequest(partnerName, secret) {
        this.props.action_partnerLogin(partnerName, secret, this.loginSuccessCallback.bind(this), this.loginFailCallback.bind(this));
    }

    loginSuccessCallback(data) {
        let loginErrors = [];

        if (data === 0) {
            loginErrors.push(this.props.t('auth.validation.loginIncorrect'));
        }
        
        this.setState({
            isLoad: false,
            partnerName: {
                value: this.state.partnerName.value,
                errors: loginErrors
            }
        });
    }

    loginFailCallback(error) {
        let loginErrors = [];

        if (error.response.status === 500) {
            loginErrors.push(this.props.t('auth.validation.loginIncorrect'));
        }

        this.setState({
            isLoad: false,
            partnerName: {
                value: this.state.partnerName.value,
                errors: loginErrors
            }
        });
    }

    render() {

        return (
            <form
                onSubmit={ this.onSubmit.bind(this) }
            >
                <input
                    type="text"
                    className={ styles.input }
                    placeholder="PartnerName"
                    onPaste={(event) => {
                        this.setState({partnerName: {
                            value: event.clipboardData.getData('Text'),
                            errors: []
                        }});
                    }}
                    onKeyUp={(event) => {
                        this.setState({partnerName: {
                            value: event.target.value,
                            errors: []
                        }});
                    }}
                />

                {
                    this.state.partnerName.errors.map((value, index) => {
                        return <span key={index} className={styles.error}>{value}</span>;
                    })
                }

                <div 
                    className={ styles.passwordInput }
                >
                    <input
                        type={ this.state.passwordInputType }
                        placeholder="Secret"
                        onPaste={(event) => {
                            this.setState({secret: {
                                value: event.clipboardData.getData('Text'),
                                errors: [],
                            }});
                        }}
                        onKeyUp={(event) => {
                            this.setState({secret: {
                                value: event.target.value,
                                errors: [],
                            }});
                        }}
                    />
                    <button onClick={ this.togglePasswordInput.bind(this) } type="button">
                        <img src={ require("@images/eyeIcon.svg").default } alt="eyeIcon" />
                    </button>
                </div>

                {
                    this.state.secret.errors.map((value, index) => {
                        return <span key={index} className={styles.error}>{value}</span>;
                    })
                }

                <button
                    type="submit"
                    className={ styles.btn }
                    disabled={this.state.isLoad}
                    onClick={ this.onSubmit.bind(this) }>
                    {
                        this.state.isLoad
                        ? <Loader type="TailSpin" className={ styles.loader } color="#fff"/>
                        : this.props.t('auth.login')
                    }
                </button>
            </form>
        );

    }
}

export default connect(
    null,
    dispatch => ({
        action_partnerLogin: (partnerName, secret, successCallback, failCallback) => {
            dispatch(action_partnerLogin(partnerName, secret, successCallback, failCallback))
        }
    })
)(withTranslation()(LoginForm));