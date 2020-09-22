// tools
import React from "react";
import styles from './styles.scss';

// components
import Header from '@containers/Header';
import TransactionCreation from '@components/TransactionCreation';

class Index extends React.Component {
    render() {
        return (
            <div className={ styles.wrapper }>
                <Header />
                <main>
                    <div className={ styles.container }>
                        <TransactionCreation />
                    </div>
                </main>
            </div>
        );
    }
}

export default Index;