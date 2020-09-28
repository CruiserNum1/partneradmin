import React from 'react';

// redux
import { connect } from "react-redux";
import action_mobgetcurrenciesinfo from "@redux/actions/mobgetcurrenciesinfo";
import action_getCashInfo from "@redux/actions/getCashInfo";

class ReduxContainer extends React.Component {
    componentDidMount() {
        if(this.props.mobgetcurrenciesinfo === null) {
            this.props.action_mobgetcurrenciesinfo();
        }

        if(this.props.getCashInfo === null) {
            this.props.action_getCashInfo();
        }
    }

    render() {
        return this.props.children;
    }
}

export default connect(
    state => ({
        mobgetcurrenciesinfo: state.mobgetcurrenciesinfo,
        getCashInfo: state.getCashInfo
    }),
    dispatch => ({
        action_mobgetcurrenciesinfo: () => {
            dispatch(action_mobgetcurrenciesinfo())
        },
        action_getCashInfo: () => {
            dispatch(action_getCashInfo())
        }
    })
)(ReduxContainer);