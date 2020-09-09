import React from 'react';
import styles from "./styles.scss";

import Vivus from "vivus";

class Loader extends React.Component {
    constructor(props) {
        super(props);

        this.object = React.createRef();
        this.vivusResetInterval = null;
    }

    componentDidMount() {
        this.logoAnimated();
    }

    componentWillUnmount() {
        clearInterval(this.vivusResetInterval);
    }

    logoAnimated() {
        const
            params = {
                type: 'oneByOne',
                duration: 200,
                start: 'autostart',
            };
        var vivus = new Vivus(this.object, params);
        this.vivusResetInterval = setInterval(() => {
            vivus.stop().reset().play();
        }, 3500);
    }

    render() {
        return (
            <div className={ styles.wrapper }>
                <div>
                    <div>
                        {/* <img width={165} height={22} src={require('@images/indacoin.svg').default} alt="indacoin-logo" /> */}
                        <object ref={ref => this.object = ref} type="image/svg+xml" data={require('@images/logo.svg').default}/>
                        <br /><span>Loading...</span>
                    </div>
                </div>
            </div>
        );
    };
}

export default Loader;