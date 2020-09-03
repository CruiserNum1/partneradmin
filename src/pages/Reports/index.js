// tools
import React from "react";
import { withTranslation, Trans } from 'react-i18next';

class Index extends React.Component {
    render() {
        return (
            <>
                <Trans i18nKey={'pages.reports.info'}>
                    Reports
                </Trans>
            </>
        );
    }
}

export default withTranslation()(Index);