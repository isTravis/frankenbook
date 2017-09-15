import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Route, withRouter, Switch } from 'react-router-dom';
import Async from 'react-code-splitting';
import queryString from 'query-string';

import Header from 'components/Header/Header';
import { getLensesData } from 'actions/lenses';
import { getDiscussionsData } from 'actions/discussions';
import { defaultLenses } from 'utilities';
import { getLogout } from 'actions/login';

require('./app.scss');

const Book = () => <Async load={import('containers/Book/Book')} />;
const Login = () => <Async load={import('containers/Login/Login')} />;
const NoMatch = () => <Async load={import('containers/NoMatch/NoMatch')} />;
const User = () => <Async load={import('containers/User/User')} />;

const propTypes = {
	dispatch: PropTypes.func.isRequired,
	location: PropTypes.object.isRequired,
	appData: PropTypes.object.isRequired,
	loginData: PropTypes.object.isRequired,
	lensesData: PropTypes.object.isRequired,
};

class App extends Component {
	static getActiveLenses(props) {
		const queryObject = queryString.parse(props.location.search);
		const lenses = queryObject.lenses && queryObject.lenses.replace(/\s/gi, '+').split('+');
		const activeLenses = lenses || defaultLenses;
		return activeLenses.join('+');
	}

	constructor(props) {
		super(props);
		this.handleLogout = this.handleLogout.bind(this);
	}

	componentWillMount() {
		const activeLenses = App.getActiveLenses(this.props);
		this.props.dispatch(getLensesData(activeLenses));
		this.props.dispatch(getDiscussionsData(activeLenses));
	}

	componentWillReceiveProps(nextProps) {
		const prevQueryObject = queryString.parse(this.props.location.search);
		const nextQueryObject = queryString.parse(nextProps.location.search);
		if (prevQueryObject.lenses !== nextQueryObject.lenses) {
			const activeLenses = App.getActiveLenses(nextProps);
			this.props.dispatch(getDiscussionsData(activeLenses));
		}
	}

	handleLogout() {
		this.props.dispatch(getLogout());
		window.location.href = window.location.origin;
	}

	render() {
		const appData = this.props.appData.data || {};
		const loginData = this.props.loginData.data || {};

		const lensesData = this.props.lensesData.data;
		return (
			<div>
				<Helmet>
					<title>{appData.title}</title>
					<meta name="description" content={appData.description} />
					<link rel="icon" type="image/png" sizes="192x192" href={appData.avatar} />
					<link rel="apple-touch-icon" type="image/png" sizes="192x192" href={appData.avatar} />
				</Helmet>

				{/* Inclues logo, login, search, profile buttons */}
				<Header
					userName={loginData.fullName}
					userInitials={loginData.initials}
					userSlug={loginData.slug}
					userAvatar={loginData.avatar}
					lensesData={lensesData}
					location={this.props.location}
					onLogout={this.handleLogout}
				/>

				<Switch>
					{/*
						Book
							Scroll
							Dropdown
							Intro
						Login
						User
						About
					*/}

					<Route exact path="/" component={Book} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/signup" component={NoMatch} />
					<Route exact path="/user/:slug" component={User} />
					<Route exact path="/:slug" component={NoMatch} />
				</Switch>

			</div>
		);
	}
}

App.propTypes = propTypes;
export default withRouter(connect(state => ({
	appData: state.app,
	lensesData: state.lenses,
	loginData: state.login,
}))(App));
