import React from 'react';
import styles from './styles.scss';

// components
import MainParams from '@components/MainParams';
import ChartParams from '@components/ChartParams';

class PartnerParams extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={ styles.wrapper }>
                <MainParams />
                <ChartParams />
            </div>
        );
    }
}

export default PartnerParams;