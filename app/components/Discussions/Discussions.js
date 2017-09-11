import React, { Component } from 'react';
import PropTypes from 'prop-types';

require('./discussions.scss');

const propTypes = {
	parentHash: PropTypes.string.isRequired,
	discussions: PropTypes.array.isRequired,
};

class Discussions extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
		};
	}

	
	render() {
		const counts = this.props.discussions.filter((item)=> {
			return item.anchor === this.props.parentHash;
		}).reduce((prev, curr)=> {
			curr.labels.forEach((label)=> {
				if (prev[label]) { 
					prev[label] += 1; 
				} else {
					prev[label] = 1;
				}
			})
			return prev;
		}, {});
		if (!Object.keys(counts).length) {
			return null;
		}
		console.log(counts);
		return (
			<span className={'discussions'}>
				{Object.keys(counts).map((key)=> {
					return <span className={`key ${key}`}>{counts[key]}</span>
				})}
			</span>
		);
	}
};

Discussions.propTypes = propTypes;
export default Discussions;
