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

const isDev = window.location.origin.indexOf('localhost:') > -1;
if (!isDev) {
	Raven.config('https://3b01f3a858544efb92cd7fed0e513f36@sentry.io/217789').install();
}

FocusStyleManager.onlyShowFocusOnTabs();

const Root = () => (
	<Provider store={store}>
		<BrowserRouter id={isDev ? '*' : 'UA-106547284-1'}>
			<ManageScroll>
				<App />
			</ManageScroll>
		</BrowserRouter>
	</Provider>
);

export default Root;
if (!module.hot) render(<Root />, document.querySelector('react'));
