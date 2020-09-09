import React from 'react';
import styles from './styles.scss';

// components
import LineChart from '@components/LineChart';
import DonutChart from '@components/DonutChart';

class ChartParams extends React.Component {
    render() {
        return (
            <div className={ styles.wrapper }>
                <LineChart />
                <DonutChart />
            </div>
        );
    }
}

export default ChartParams;