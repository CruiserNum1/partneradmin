// tools
import React from "react";
import { withTranslation, Trans } from 'react-i18next';

// components
import Header from '@containers/Header';

class Index extends React.Component {
    render() {
        return (
            <>
                <Header />
                <Trans i18nKey={'pages.reports.info'}>
                    Reports
                </Trans>
            </>
        );
    }
}

export default withTranslation()(Index);