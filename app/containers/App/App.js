import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Route, withRouter, Switch } from 'react-router-dom';
import Async from 'react-code-splitting';

import Header from 'components/Header/Header';

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
};

class App extends Component {
	static logoutHandler() {
		// console.log('Logout');
	}


	render() {
		const appData = this.props.appData.data || {};
		const loginData = this.props.loginData.data || {};

		const lensData = [
			{
				title: 'Engineering',
				slug: 'engineering',
				description: 'All about engineering',
				color: '#27ae60',
				icon: 'edit',
			},
			{
				title: 'Ethics',
				slug: 'ethics',
				description: 'All about Ethics and things like that. An introspection into how we do things that are manifested in ways that arent exactly what they seem.',
				color: '#d35400',
				icon: 'application',
			},
		];

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
					lensData={lensData}
					location={this.props.location}
					logoutHandler={App.logoutHandler}
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
	loginData: state.login
}))(App));
