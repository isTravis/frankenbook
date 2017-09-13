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
		// 	{
		// 		title: 'Engineering',
		// 		slug: 'engineering',
		// 		description: 'All about engineering',
		// 		color: '#27ae60',
		// 		icon: 'edit',
		// 	},
		// 	{
		// 		title: 'Ethics',
		// 		slug: 'ethics',
		// 		description: 'All about Ethics and things like that. An introspection into how we do things that are manifested in ways that arent exactly what they seem.',
		// 		color: '#d35400',
		// 		icon: 'application',
		// 	},
		// ];
			{
				title: 'Technology',
				slug: 'technology',
				description: 'Emerging Frankensteinian technologies, from AI to geoengineering, plus historical technologies connected to the novel.',
				icon: 'tech',
				color: '#c0392b',
			},
			{
				title: 'Science',
				slug: 'science',
				description: 'Natural science today and in the past, from ancients and alchemists to Romantic scientists like Davy, Lamarck, and the Herschels.',
				icon: 'science',
				color: '#d35400',
			},
			{
				title: 'Health & Medicine',
				slug: 'healthmed',
				description: 'Digging into Frankenstein’s preoccupation with health, disease, and the body.',
				icon: 'health',
				color: '#8e44ad',
			},
			{
				title: 'Philosophy & Politics',
				slug: 'philpol',
				description: 'From Locke and Rousseau to Sartre and Nussbaum, the big ideas that animate Frankenstein, and that help us reframe and reinterpret the novel today.',
				icon: 'philosophy',
				color: '#2980b9',
			},
			{
				title: 'Mary Shelley',
				slug: 'mary',
				description: 'The woman at the heart of it all: Mary Shelley’s life; her trials, travails, and adventures; her friends and family; and her literary oeuvre.',
				icon: 'shelley',
				color: '#16a085',
			},
			{
				title: 'Influences & Adaptations',
				slug: 'infladap',
				description: 'Which stories, novels, and poems influenced Shelley when she was writing Frankenstein? How has Frankenstein echoed and proliferated throughout pop culture and public discourse over the past 200 years?',
				icon: 'influence',
				color: '#27ae60',
			},
			{
				title: 'Equity & Inclusion',
				slug: 'equitincl',
				description: 'Frankenstein is a poignant story about the pain and destruction wrought by prejudice and social exclusion, written by a woman living in a deeply inequitable culture. How does the novel illuminate these issues, and how have people continued to deploy Frankenstein as a symbol in the struggle for justice?  ',
				icon: 'equity',
				color: '#1abc9c',
			},
			{
				title: 'Motivations & Sentiments',
				slug: 'motivments',
				description: 'The emotions, values, ideals, and obsessions that drive human ingenuity, from the tortured and inspired character of Victor Frankenstein, to the Romantic scientists of Mary Shelley’s day, to the creators and innovators of the twenty-first century.',
				icon: 'motivations',
				color: '#3498db',
			}
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
