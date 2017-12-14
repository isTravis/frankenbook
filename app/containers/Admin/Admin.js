import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';
import { withRouter } from 'react-router-dom';
import DiscussionAdmin from 'components/DiscussionAdmin/DiscussionAdmin';
import { getAdminData, putAdminDiscussion, postAdminDiscussionLabel, deleteAdminDiscussionLabel } from 'actions/admin';

require('./admin.scss');

const propTypes = {
	dispatch: PropTypes.func.isRequired,
	adminData: PropTypes.object.isRequired,
	loginData: PropTypes.object.isRequired,
};

class Admin extends Component {
	constructor(props) {
		super(props);
		this.handlePutDiscussion = this.handlePutDiscussion.bind(this);
		this.handleAddLabel = this.handleAddLabel.bind(this);
		this.handleRemoveLabel = this.handleRemoveLabel.bind(this);
	}
	componentWillMount() {
		this.props.dispatch(getAdminData());
	}

	handlePutDiscussion(discussionObject) {
		this.props.dispatch(putAdminDiscussion(discussionObject));
	}
	handleAddLabel(labelObject) {
		this.props.dispatch(postAdminDiscussionLabel(labelObject));
	}
	handleRemoveLabel(labelObject) {
		this.props.dispatch(deleteAdminDiscussionLabel(labelObject));
	}
	render() {
		const adminData = this.props.adminData.data || {};
		const labels = adminData.labels || [];
		const discussions = adminData.discussions || [];
		return (
			<div className={'admin-wrapper'}>
				<Helmet>
					<title>Admin</title>
				</Helmet>

				<style>
					{labels.map((lens)=> {
						return `.pt-tag.${lens.slug} { background-color: ${lens.color}; } `;
					})}
				</style>

				<div className={'container narrow'}>
					<div className={'row'}>
						<div className={'col-12'}>
							<h1>Admin</h1>
							{this.props.adminData.isLoading && 'Loading'}
							{discussions.sort((foo, bar)=> {
								if (foo.createdAt > bar.createdAt) { return -1; }
								if (foo.createdAt < bar.createdAt) { return 1; }
								return 0;
							}).map((item)=> {
								return (
									<div className={'pt-card pt-elevation-2'} key={item.id}>
										<DiscussionAdmin
											discussion={item}
											labels={labels}
											onAddLabel={this.handleAddLabel}
											onRemoveLabel={this.handleRemoveLabel}
											onUpdateDiscussion={this.handlePutDiscussion}
											putDiscussionIsLoading={this.props.adminData.putDiscussionIsLoading === item.id}
										/>
									</div>
								);
							})}
							
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
