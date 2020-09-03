import React from 'react';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";

// redux
import { connect } from "react-redux";

// global styles
import "@styles/root.css";

// i18n
import i18nInit, { languagesPattern } from "@tools/language/i18n-init";

// Pattern
import Pattern from "@tools/language/Pattern";

// pages
import NotFound from '@pages/404';
import { ROUTES, REDIRECT } from './routes';
import Authorization from '@pages/Authorization';

const LANG_PARAM = '/:lang(' + languagesPattern() + ')?/';

class App extends React.Component {
	constructor() {
		super();

		this.state = {
			LANGUAGE_PATTERN: null
		};

		i18nInit();
	}

	routes(routes, wrapper = null) {
        return routes.map((value, index) => {
            const wrap = {
                component: wrapper,
            };

            return <Route
                exact path={ LANG_PARAM + value.path }
                render={(props) => {
                    if(wrapper != null) {
                        return (
                            <wrap.component {...props}>
                                <value.component {...props} />
                            </wrap.component>
                        );
                    }

                    return <value.component {...props} />
                }}
                key={index}
            />
        });
	}
	
	renderItem() {
		if (!this.props.isPartnerAuthorized) {
			return (
				<Authorization />
			);
		};

		return (
			<Switch>
				{ this.routes(ROUTES) }
				<Route path={'*'} component={ NotFound }/>
			</Switch>
		);
	}
	
	render() {
		return (
			<Pattern
				newpattern = {(pattern) => {
					this.setState({ LANGUAGE_PATTERN: pattern });
				}}
			>
				{
					(this.state.LANGUAGE_PATTERN !== null)
					&&
					<Router basename={env.BASE_PATH}>
						{ this.renderItem() }
					</Router>
				}
			</Pattern>
		);
	}
}

export default connect(
	state => ({
		isPartnerAuthorized: state.isPartnerAuthorized
	}),
	null
)(App);