import React from 'react';
import styles from './styles.scss';

// components
import MainParams from '@components/MainParams';
import ChartParams from '@components/ChartParams';

class PartnerParams extends React.Component {
    constructor(props) {
        super(props);

        this.data = props.data;
    }

    render() {
        var t = new Date(parseInt(this.data.enabledTill.slice(6, -2)));
        console.log(t.getDate(), t.getMonth(), t.getFullYear());
        return (
            <div className={ styles.wrapper }>
                <MainParams data={ this.props.data } />
                <ChartParams />
            </div>
        );
    }
}

export default PartnerParams;