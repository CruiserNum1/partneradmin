import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { withTranslation } from 'react-i18next';
// import Seo from '@tools/Seo';

// redux
import action_getMainParams from '@redux/actions/authorization/getMainParams';
import action_getTransactions from '@redux/actions/authorization/getTransactions';
import action_setLoading from '@redux/actions/setLoading';
import { connect } from 'react-redux';

// components
import Loader from '@components/Loader';

class AppContainer extends Component {
    constructor (props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.mainParams === null) {
            this.props.action_getMainParams();
        }

        if (this.props.transactions === null) {
            let dataObj = {
                info: {}
            };
            this.props.action_getTransactions(dataObj);
        }
    }

    componentDidUpdate() {
        const { mainParams, transactions } = this.props;

        if (mainParams && transactions) {
            setTimeout(() => this.props.action_setLoading(false), 500);
        }
    }

    render () {
        // loading
        if (this.props.isLoading)
            return <Loader />
        
        return this.props.children;
    }
}

export default connect(
    state => ({
        mainParams: state.mainParams,
        transactions: state.transactions,
        isLoading: state.isLoading
    }),
    dispatch => ({
        action_getMainParams: () => {
            dispatch(action_getMainParams())
        },
        action_getTransactions: (dataObj) => {
            dispatch(action_getTransactions(dataObj))
        },
        action_setLoading: (state) => {
            dispatch(action_setLoading(state))
        }
    })
)(withRouter(withTranslation()(AppContainer)));
