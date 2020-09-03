import React from 'react';
import { Link } from 'react-router-dom';

export default class extends React.Component {
    render() {
        return (
            <Link to="">
                <img src={ require('@images/logo.svg').default } />
            </Link>
        );
    }
}