import React from 'react';
import styles from './styles.scss';

// components
import { Trans, withTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// requests
import { updateUrls } from '@requests/partner/updateUrls';
import { setPartnerCss } from '@requests/partner/setPartnerCss';
import { logoUpload } from '@requests/partner/logoUpload';

// redux
import { connect } from 'react-redux';

const updateUrlInstance = updateUrls.getInstance();
const setPartnerCssInstance = setPartnerCss.getInstance();
const logoUploadInstance = logoUpload.getInstance();

class PartnerSettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            webhookUrl: this.props.mainParams.webhook,
            successUrl: this.props.mainParams.successurl,
            failUrl: this.props.mainParams.failurl,
            css: ''
        };

        this.spanElement = React.createRef();
        this.inputFileElement = React.createRef();
    }

    updateUrls() {
        let dataObj = {
            failurl: this.state.failUrl,
            successurl: this.state.successUrl,
            webhook: this.state.webhookUrl
        };

        updateUrlInstance.request(dataObj);
        updateUrlInstance.response(res => {
            if (res?.d === true) {
                toast.success(this.props.t('toast.updated'), {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            } else {
                toast.error(this.props.t('toast.error'), {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }
        });
    }

    setPartnerCss() {
        let dataObj = {
            CSS: this.state.css
        };

        setPartnerCssInstance.request(dataObj);
        setPartnerCssInstance.response(res => {
            if (res?.d?.result === true) {
                toast.success(this.props.t('toast.updated'), {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            } else {
                toast.error(this.props.t('toast.error'), {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }
        });
    }

    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    async logoUpload() {
        let logo = this.inputFileElement.files[0];
        if (logo) {
            let dataObj = {};
            let base64 = await this.getBase64(logo);
            if (base64) {
                dataObj['fname'] = logo.name;
                dataObj['logoBase64'] = base64;
            }
            logoUploadInstance.request(dataObj);
            logoUploadInstance.response(res => {
                if (res?.d === 1) {
                    toast.success(this.props.t('toast.updated'), {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                } else {
                    toast.error(this.props.t('toast.error'), {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                }
            })
        }
    }

    onFileChange(event) {
        let fileName = event.target.value.split( '\\' ).pop();
        if (fileName) {
            this.spanElement.innerHTML = fileName;
        }
    }

    render() {
        return (
            <div className={ styles.wrapper }>
                <ToastContainer />
                <h1 className={ styles.title }>
                    <Trans i18nKey="pages.settings.title">
                        Settings
                    </Trans>
                </h1>
                <div className={ styles.content }>
                    <div className={ styles.inputBlock }>
                        <h3>
                            <Trans i18nKey="pages.settings.webhook">
                                Webhook url (for all post callbacks)
                            </Trans>
                        </h3>
                        <input
                            type="text"
                            value={this.state.webhookUrl}
                            onChange={(e) => this.setState({ webhookUrl: e.target.value })}
                            placeholder="https://..."
                        />
                    </div>
                    <div className={ styles.inputBlock }>
                        <h3>
                            <Trans i18nKey="pages.settings.successUrl">
                                Success url (for user redirect after payment)
                            </Trans>
                        </h3>
                        <input
                            type="text"
                            value={this.state.successUrl}
                            onChange={(e) => this.setState({ successUrl: e.target.value })}
                            placeholder="https://..."
                        />
                    </div>
                    <div className={ styles.inputBlock }>
                        <h3>
                            <Trans i18nKey="pages.settings.failUrl">
                                Fail url (for user redirect after payment)
                            </Trans>
                        </h3>
                        <input
                            type="text"
                            value={this.state.failUrl}
                            onChange={(e) => this.setState({ failUrl: e.target.value })}
                            placeholder="https://..."
                        />
                    </div>
                    <div className={ styles.btnBlock }>
                        <button onClick={this.updateUrls.bind(this)}>
                            <Trans i18nKey="pages.settings.update">
                                Update
                            </Trans>
                        </button>
                    </div>
                    <div className={ styles.inputBlock }>
                        <h3>
                            <Trans i18nKey="pages.settings.updateCss">
                                Update css(need approve from manager)
                            </Trans>
                        </h3>
                        <textarea
                            value={this.state.css}
                            onChange={(e) => this.setState({ css: e.target.value })}
                            placeholder={this.props.t('pages.settings.enterCss')}
                        />
                    </div>
                    <div className={ styles.btnBlock }>
                        <button onClick={this.setPartnerCss.bind(this)}>
                            <Trans i18nKey="pages.settings.update">
                                Update
                            </Trans>
                        </button>
                    </div>
                    
                    <h3>
                        <Trans i18nKey="pages.settings.updateLogo">
                            Update logo (width(50-200)px height(30-50)px)
                        </Trans>
                    </h3>
                    <div className={ styles.uploadBlock }>
                        <input type="file" id="file" ref={ref => this.inputFileElement = ref} onChange={this.onFileChange.bind(this)} />
                        <label htmlFor="file">
                            <span ref={ref => this.spanElement = ref}>
                                <Trans i18nKey="pages.settings.chooseFile">
                                    Choose a file
                                </Trans>
                            </span>
                        </label>
                        <button onClick={this.logoUpload.bind(this)}>
                            <Trans i18nKey="pages.settings.upload">
                                Upload
                            </Trans>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
	state => ({
        mainParams: state.mainParams,
        transactions: state.transactions
	}),
	null
)(withTranslation()(PartnerSettings));