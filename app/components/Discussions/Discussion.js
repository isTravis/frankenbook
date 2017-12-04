import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import DiscussionItem from 'components/DiscussionItem/DiscussionItem';
import DiscussionInput from 'components/DiscussionInput/DiscussionInput';
import { postDiscussion, putDiscussion } from 'actions/discussions';

require('./discussions.scss');

const propTypes = {
	parentHash: PropTypes.string.isRequired,
	discussionsData: PropTypes.object.isRequired,
	loginData: PropTypes.object.isRequired,
	lensesData: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired,
	// routerContext: PropTypes.object.isRequired,
	// storeContext: PropTypes.object.isRequired,
	// userId: PropTypes.string,
	// handleReplySubmit: PropTypes.func.isRequired,
	// replySubmitLoading: PropTypes.bool,
};

// const defaultProps = {
// 	discussions: [],
// 	userId: undefined,
// 	replySubmitLoading: false,
// };

class Discussions extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
		};
		this.openDiscussions = this.openDiscussions.bind(this);
		this.closeDiscussions = this.closeDiscussions.bind(this);
		this.handleReplySubmit = this.handleReplySubmit.bind(this);
		this.handleEditSubmit = this.handleEditSubmit.bind(this);
		this.handleNewAnnotation = this.handleNewAnnotation.bind(this);
	}

	openDiscussions() {
		this.setState({ isOpen: true });
	}

	closeDiscussions() {
		this.setState({ isOpen: false });
	}

	handleReplySubmit(discussionObject) {
		this.props.dispatch(postDiscussion(discussionObject));
	}
	handleEditSubmit(discussionObject) {
		this.props.dispatch(putDiscussion(discussionObject));
	}
	handleNewAnnotation(annotationData) {
		this.props.dispatch(postDiscussion({
			userId: this.props.loginData.data.id,
			anchor: this.props.parentHash,
			content: annotationData.content,
			text: annotationData.text
		}));
	}
	render() {
		const discussions = this.props.discussionsData.data || [];
		const userId = this.props.loginData.data && this.props.loginData.data.id;
		const saveDiscussionLoading = this.props.discussionsData.isLoading || '';

		const numTopDiscussions = discussions.filter((item)=> {
			return item.anchor === this.props.parentHash && !item.parentId;
		}).length;

		return (
			<div className={'discussions'}>
				{!this.state.isOpen &&
					<span className={'tags-wrapper'} tabIndex={-1} role={'button'} onClick={this.openDiscussions}>
						{numTopDiscussions
							? <span className={'key count'}>{numTopDiscussions}</span>
							: <span className={'key add'}>+</span>
						}
					</span>
				}

				{this.state.isOpen &&
					<span className={'tags-wrapper'} tabIndex={-1} role={'button'} onClick={this.closeDiscussions}>
						<span className={'key'} role={'button'}>Collapse</span>
					</span>
				}

				{this.state.isOpen &&
					<div className={'pt-card pt-elevation-2'}>
						{discussions.filter((item)=> {
							return item.anchor === this.props.parentHash;
						}).map((item)=> {
							return (
								<DiscussionItem
									key={item.id}
									discussion={item}
									userId={userId}
									handleReplySubmit={this.handleReplySubmit}
									handleEditSubmit={this.handleEditSubmit}
									saveDiscussionLoading={saveDiscussionLoading}
								/>
							);
						})}
						<div className={'new-annotation'}>
							<h4>New Annotation</h4>
							<DiscussionInput
								handleSubmit={this.handleNewAnnotation}
								isReply={false}
								submitIsLoading={saveDiscussionLoading === `${this.props.parentHash}-new`}
								getHighlightContent={()=>{}}
								userId={userId}
							/>
						</div>
					</div>
				}
			</div>
		);
	}
}

// Discussions.defaultProps = defaultProps;
Discussions.propTypes = propTypes;
export default connect(state => ({
	discussionsData: state.discussions,
	lensesData: state.lenses,
	loginData: state.login
}))(Discussions);
