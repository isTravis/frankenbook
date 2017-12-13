import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getAdminData } from 'actions/admin';

require('./admin.scss');

const propTypes = {
	dispatch: PropTypes.func.isRequired,
	adminData: PropTypes.object.isRequired,
	loginData: PropTypes.object.isRequired,
};

class Admin extends Component {

	componentWillMount() {
		this.props.dispatch(getAdminData());
	}

	render() {
		return (
			<div className={'admin-wrapper'}>
				<Helmet>
					<title>Admin</title>
				</Helmet>

				<div className={'container small'}>
					<div className={'row'}>
						<div className={'col-12'}>
							<h1>Admin</h1>
							{this.props.adminData.isLoading && 'Loading'}
							{this.props.adminData.data}
							
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Admin.propTypes = propTypes;
export default withRouter(connect(state => ({
	adminData: state.admin,
	loginData: state.login,
}))(Admin));
