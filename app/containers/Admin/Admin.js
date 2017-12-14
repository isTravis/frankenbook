import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';
import { withRouter } from 'react-router-dom';
import { Editor } from '@pubpub/editor';
import HighlightQuote from '@pubpub/editor/addons/HighlightQuote';
import Image from '@pubpub/editor/addons/Image';
import Video from '@pubpub/editor/addons/Video';
import Iframe from '@pubpub/editor/addons/Iframe';
import { getResizedUrl } from 'utilities';
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
		const flatDiscussions = [];
		const usedDiscussions = {};
		const adminData = this.props.adminData.data || {};
		const labels = adminData.labels || [];
		labels.forEach((label)=> {
			const discussions = label.discussions || [];
			discussions.forEach((discussion)=> {
				const withoutReplies = {
					...discussion,
					replies: undefined,
				};
				if (!usedDiscussions[withoutReplies.id]) {
					usedDiscussions[withoutReplies.id] = true;
					flatDiscussions.push(withoutReplies);	
				}
				const replies = discussion.replies || [];
				replies.forEach((reply)=> {
					if (!usedDiscussions[reply.id]) {
						usedDiscussions[reply.id] = true;
						flatDiscussions.push(reply);	
					}
				})
			});
		});

		return (
			<div className={'admin-wrapper'}>
				<Helmet>
					<title>Admin</title>
				</Helmet>

				<div className={'container narrow'}>
					<div className={'row'}>
						<div className={'col-12'}>
							<h1>Admin</h1>
							{this.props.adminData.isLoading && 'Loading'}
							{flatDiscussions.sort((foo, bar)=> {
								if (foo.updatedAt > bar.updatedAt) { return -1; }
								if (foo.updatedAt < bar.updatedAt) { return 1; }
								return 0;
							}).map((item)=> {
								return (
									<div key={item.id}>
										<TimeAgo date={item.updatedAt} />
										<Editor
											initialContent={item.content}
											isReadOnly={true}
										>
											<HighlightQuote
												getHighlightContent={()=>{}}
											/>
											<Image
												handleResizeUrl={(url)=> { return getResizedUrl(url, 'fit-in', '800x0'); }}
											/>
											<Video />
											<Iframe />
										</Editor>
										<hr/>
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
