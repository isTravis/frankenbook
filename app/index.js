/* global Raven */

import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-g-analytics';
import { FocusStyleManager } from '@blueprintjs/core';

import App from 'containers/App/App';
import ManageScroll from 'components/ManageScroll/ManageScroll';
import store from './store';

require('./manageServiceWorker');

Raven.config('https://fde9b2d54d5144c9b82341312872e501@sentry.io/217786').install();
FocusStyleManager.onlyShowFocusOnTabs();

const Root = () => (
	<Provider store={store}>
		<BrowserRouter id="UA-106547284-1">
			<ManageScroll>
				<App />
			</ManageScroll>
		</BrowserRouter>
	</Provider>
);

export default Root;

if (!module.hot) render(<Root />, document.querySelector('react'));
