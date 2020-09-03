import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// redux
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import combineReducers from '@redux/combineReducers';

import ReduxContainer from "@redux";

const store = process.env.NODE_ENV === 'development'
		? createStore(combineReducers, composeWithDevTools(applyMiddleware(thunk)))
		: createStore(combineReducers, (applyMiddleware(thunk)));

ReactDOM.render(
	<Provider store={ store }>
		<ReduxContainer>
			<App />
		</ReduxContainer>
	</Provider>,
	document.getElementById('root')
);