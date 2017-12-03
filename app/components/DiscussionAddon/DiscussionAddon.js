import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DiscussionsWrapper from './DiscussionsWrapper';

const propTypes = {
	routerContext: PropTypes.object.isRequired,
	storeContext: PropTypes.object.isRequired,
};

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
						return (
							<DiscussionsWrapper
								parentHash={node.attrs.parentHash}
								routerContext={props.routerContext}
								storeContext={props.storeContext}
							/>
						);
					},
					toStatic(node) {
						return (
							<DiscussionsWrapper
								parentHash={node.attrs.parentHash}
								routerContext={props.routerContext}
								storeContext={props.storeContext}
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
export default DiscussionAddon;
