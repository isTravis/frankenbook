import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Discussions from 'components/Discussions/Discussion2';

const propTypes = {
	parentHash: PropTypes.string.isRequired,
	// discussionsData: PropTypes.object.isRequired,
	// loginData: PropTypes.object.isRequired,
	// lensesData: PropTypes.object.isRequired,
	routerContext: PropTypes.object.isRequired,
	storeContext: PropTypes.object.isRequired,
	// userId: PropTypes.string,
	// handleReplySubmit: PropTypes.func.isRequired,
	// replySubmitLoading: PropTypes.bool,
};

// const defaultProps = {
// 	discussions: [],
// 	userId: undefined,
// 	replySubmitLoading: false,
// };

const childContextTypes = {
	router: PropTypes.object,
	store: PropTypes.object,
};

class DiscussionsWrapper extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		isOpen: false,
	// 	};
	// 	this.openDiscussions = this.openDiscussions.bind(this);
	// 	this.closeDiscussions = this.closeDiscussions.bind(this);
	// 	this.handleReplySubmit = this.handleReplySubmit.bind(this);
	// }
	getChildContext() {
		return {
			router: this.props.routerContext,
			store: this.props.storeContext,
		};
	}

	// openDiscussions() {
	// 	this.setState({ isOpen: true });
	// }

	// closeDiscussions() {
	// 	this.setState({ isOpen: false });
	// }

	// handleReplySubmit(discussionObject) {
	// 	this.props.dispatch(postDiscussion(discussionObject));
	// }

	render() {
		return (
			<Discussions parentHash={this.props.parentHash} />
		);
	}
}

DiscussionsWrapper.propTypes = propTypes;
DiscussionsWrapper.childContextTypes = childContextTypes;
export default DiscussionsWrapper;
