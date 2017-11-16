import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import DiscussionItem from 'components/DiscussionItem/DiscussionItem';
import { postDiscussion } from 'actions/discussions';

require('./discussions.scss');

const propTypes = {
	parentHash: PropTypes.string.isRequired,
	discussionsData: PropTypes.object.isRequired,
	loginData: PropTypes.object.isRequired,
	lensesData: PropTypes.object.isRequired,
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

	render() {
		const discussions = this.props.discussionsData.data || [];
		const userId = this.props.loginData.data && this.props.loginData.data.id;
		const replySubmitLoading = this.props.discussionsData.isLoading;

		const counts = discussions.filter((item)=> {
			return item.anchor === this.props.parentHash;
		}).reduce((prev, curr)=> {
			curr.labels.forEach((label)=> {
				if (prev[label.slug]) {
					prev[label.slug] += 1;
				} else {
					prev[label.slug] = 1;
				}
			});
			return prev;
		}, {});

		if (!Object.keys(counts).length) {
			return null;
		}

		return (
			<div className={'discussions'}>
				{!this.state.isOpen &&
					<span className={'tags-wrapper'} tabIndex={-1} role={'button'} onClick={this.openDiscussions}>
						{Object.keys(counts).map((key)=> {
							return <span key={`${this.props.parentHash}-${key}`} className={`key ${key}`}>{counts[key]}</span>;
						})}
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
									userId={this.props.userId}
									handleReplySubmit={this.props.handleReplySubmit}
									replySubmitLoading={this.props.replySubmitLoading}
								/>
							);
						})}
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
