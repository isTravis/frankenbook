import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import UserHeader from 'components/UserHeader/UserHeader';
import { getUserData } from 'actions/user';

require('./user.scss');

const propTypes = {
	dispatch: PropTypes.func.isRequired,
	match: PropTypes.object.isRequired,
	userData: PropTypes.object.isRequired,
};

class User extends Component {
	componentWillMount() {
		this.props.dispatch(getUserData(this.props.match.params.slug));
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.match.params.slug !== this.props.match.params.slug) {
			this.props.dispatch(getUserData(nextProps.match.params.slug));
		}
	}

	render() {
		const userData = this.props.userData.data || {};

		return (
			<div className={'user'}>

				<Helmet>
					<title>{userData.fullName}</title>
					<meta name="description" content={userData.bio} />
				</Helmet>

				<div className={'container narrow header'}>
					<div className={'row'}>
						<div className={'col-12'}>
							<UserHeader userData={userData} />
						</div>
					</div>
				</div>

			</div>
		);
	}
}

User.propTypes = propTypes;
export default withRouter(connect(state => ({
	userData: state.user
}))(User));
