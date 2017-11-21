import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DiscussionsWrapper from './DiscussionsWrapper';

const propTypes = {
	routerContext: PropTypes.object.isRequired,
	storeContext: PropTypes.object.isRequired,
	// discussions: PropTypes.array,
	// userId: PropTypes.string,
	// handleReplySubmit: PropTypes.func.isRequired,
	// replySubmitLoading: PropTypes.bool,
};
// const defaultProps = {
// 	discussions: [],
// 	userId: undefined,
// 	replySubmitLoading: false,
// };

class DiscussionAddon extends Component {
	static schema = (props)=> {
		return {
			nodes: {
				discussion: {
					atom: true,
					group: 'inline',
					inline: true,
					draggable: false,
					selectable: true,
					attrs: {
						parentHash: { default: null },
					},
					toEditable(node) {
						// return null;
						return <DiscussionsWrapper
							parentHash={node.attrs.parentHash}
							routerContext={props.routerContext}
							storeContext={props.storeContext}
							// discussions={props.discussions}
							// handleReplySubmit={props.userId}
							// replySubmitLoading={props.handleReplySubmit}
							// userId={props.replySubmitLoading}
						/>
					},
					toStatic(node) {
						// return <div>{node.attrs.parentHash}</div>;
						// console.log(props);
						return (
							<DiscussionsWrapper
								parentHash={node.attrs.parentHash}
								routerContext={props.routerContext}
								storeContext={props.storeContext}
								// discussions={props.discussions}
								// handleReplySubmit={props.userId}
								// replySubmitLoading={props.handleReplySubmit}
								// userId={props.replySubmitLoading}
							/>
						);
					},
				},
			}
		};
	};

	render() {
		return null;
	}
}

DiscussionAddon.propTypes = propTypes;
// DiscussionAddon.defaultProps = defaultProps;
export default DiscussionAddon;
