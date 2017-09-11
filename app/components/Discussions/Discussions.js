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
		this.openDiscussions = this.openDiscussions.bind(this);
	}

	openDiscussions() {
		this.setState({ isOpen: true });
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

		if (!this.state.isOpen) {
			return (
				<span className={'discussions-small'} onClick={this.openDiscussions}>
					{Object.keys(counts).map((key)=> {
						return <span className={`key ${key}`}>{counts[key]}</span>
					})}
				</span>
			);
		}

		return (
			<div className={'discussions-large pt-card pt-elevation-2'}>
				{this.props.discussions.filter((item)=> {
					return item.anchor === this.props.parentHash;
				}).map((item)=> {
					return (
						<div className={'discussion-item'}>
							{JSON.stringify(item.content)}
						</div>
					);
				})}


			</div>
		);
		
	}
};

Discussions.propTypes = propTypes;
export default Discussions;
