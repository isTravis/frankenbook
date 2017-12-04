import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import UserHeader from 'components/UserHeader/UserHeader';
import { getUserData } from 'actions/user';
import DiscussionItem from 'components/DiscussionItem/DiscussionItem';

require('./user.scss');

const propTypes = {
	dispatch: PropTypes.func.isRequired,
	match: PropTypes.object.isRequired,
	userData: PropTypes.object.isRequired,
};

class User extends Component {
	constructor(props) {
		super(props);
	}
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
		const discussions = userData.discussions || [];
		const discussionsWithAuthor = discussions.map((item)=> {
			return {
				...item,
				author: {
					slug: userData.slug,
					initials: userData.initials,
					fullName: userData.fullName,
					avatar: userData.avatar,
				},
				labels: [],
			};
		});

		if (!userData.id) { return null; }
		return (
			<div className={'user'}>

				<Helmet>
					<title>{userData.fullName}</title>
					<meta name="description" content={userData.bio} />
				</Helmet>

				<div className={'container narrow user-header-wrapper'}>
					<div className={'row'}>
						<div className={'col-12'}>
							<UserHeader userData={userData} />
						</div>
					</div>
				</div>

				<div className={'container narrow nav'}>
					<div className={'row'}>
						<div className={'col-12'}>
							<div className={'nav-title'}>Discussions</div>
						</div>
					</div>
				</div>

				<div className={'container narrow'}>
					<div className={'row'}>
						<div className={'col-12'}>
							{discussionsWithAuthor.sort((foo, bar)=> {
								if (foo.createdAt < bar.createdAt) { return 1; }
								if (foo.createdAt > bar.createdAt) { return -1; }
								return 0;
							}).map((item)=> {
								return (
									<div key={`disc-${item.id}`} className={'discussion-item-wrapper'}>
										<DiscussionItem
											discussion={item}
											isProfile={true}
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

User.propTypes = propTypes;
export default withRouter(connect(state => ({
	userData: state.user
}))(User));
