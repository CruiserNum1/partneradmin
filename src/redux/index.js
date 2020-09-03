import React from 'react';

// redux
import { connect } from "react-redux";
import action_mobgetcurrenciesinfo from "@redux/actions/mobgetcurrenciesinfo";

class ReduxContainer extends React.Component {
    componentDidMount() {
        if(this.props.mobgetcurrenciesinfo === null) {
            this.props.action_mobgetcurrenciesinfo();
        }
    }

    render() {
        return this.props.children;
    }
}

export default connect(
    state => ({
        mobgetcurrenciesinfo: state.mobgetcurrenciesinfo,
    }),
    dispatch => ({
        action_mobgetcurrenciesinfo: () => {
            dispatch(action_mobgetcurrenciesinfo())
        }
    })
)(ReduxContainer);