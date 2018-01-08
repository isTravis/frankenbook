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

const About = () => <Async load={import('containers/About/About')} />;
const Admin = () => <Async load={import('containers/Admin/Admin')} />;
const Book = () => <Async load={import('containers/Book/Book')} />;
const Essays = () => <Async load={import('containers/Essays/Essays')} />;
const Login = () => <Async load={import('containers/Login/Login')} />;
const Media = () => <Async load={import('containers/Media/Media')} />;
const NoMatch = () => <Async load={import('containers/NoMatch/NoMatch')} />;
const PasswordReset = () => <Async load={import('containers/PasswordReset/PasswordReset')} />;
const Signup = () => <Async load={import('containers/Signup/Signup')} />;
const User = () => <Async load={import('containers/User/User')} />;
const UserCreate = () => <Async load={import('containers/UserCreate/UserCreate')} />;

const propTypes = {
	dispatch: PropTypes.func.isRequired,
	location: PropTypes.object.isRequired,
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
		const loginData = this.props.loginData.data || {};

		const lensesData = this.props.lensesData.data;
		return (
			<div>
				<Helmet>
					<title>FrankenBook</title>
					<meta name="description" content={'Open Frankenstein'} />
					<link rel="icon" type="image/png" sizes="500x500" href={'/icon.png'} />
					<link rel="apple-touch-icon" type="image/png" sizes="500x500" href={'/icon.png'} />
				</Helmet>

				{/* Inclues logo, login, search, profile buttons */}
				<Header
					userName={loginData.fullName}
					userInitials={loginData.initials}
					userSlug={loginData.slug}
					userAvatar={loginData.avatar}
					lensesData={lensesData}
					location={this.props.location}
					appLoading={this.props.lensesData.isLoading}
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
					<Route exact path="/about" component={About} />
					<Route exact path="/admin" component={Admin} />
					<Route exact path="/essays" component={Essays} />
					<Route exact path="/media" component={Media} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/password-reset" component={PasswordReset} />
					<Route exact path="/password-reset/:resetHash/:slug" component={PasswordReset} />
					<Route exact path="/signup" component={Signup} />
					<Route exact path="/user/create/:hash" component={UserCreate} />
					<Route exact path="/user/:slug" component={User} />
					<Route exact path="/:slug" component={NoMatch} />
				</Switch>

			</div>
		);
	}
}

App.propTypes = propTypes;
export default withRouter(connect(state => ({
	lensesData: state.lenses,
	loginData: state.login,
}))(App));
