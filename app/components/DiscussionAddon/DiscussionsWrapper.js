import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Discussions from 'components/Discussions/Discussion';

const propTypes = {
	parentHash: PropTypes.string.isRequired,
	routerContext: PropTypes.object.isRequired,
	storeContext: PropTypes.object.isRequired,
};

const childContextTypes = {
	router: PropTypes.object,
	store: PropTypes.object,
};

class DiscussionsWrapper extends Component {
	getChildContext() {
		return {
			router: this.props.routerContext,
			store: this.props.storeContext,
		};
	}

	render() {
		return (
			<Discussions parentHash={this.props.parentHash} />
		);
	}
}

DiscussionsWrapper.propTypes = propTypes;
DiscussionsWrapper.childContextTypes = childContextTypes;
export default DiscussionsWrapper;
