// tools
import React from "react";
import styles from './styles.scss';

// components
import Header from '@containers/Header';
import MainParams from '@components/MainParams';
import FaqSection from "@components/FaqSection";

class Index extends React.Component {
    render() {
        return (
            <div className={ styles.wrapper }>
                <Header />
                <main>
                    <div className={ styles.faq + ' ' + styles.container }>
                        <MainParams />
                        <FaqSection />
                    </div>
                </main>
            </div>
        );
    }
}

export default Index;