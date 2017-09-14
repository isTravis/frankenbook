import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DiscussionItem from 'components/DiscussionItem/DiscussionItem';

require('./discussions.scss');

const propTypes = {
	parentHash: PropTypes.string.isRequired,
	discussions: PropTypes.array,
	handleReplySubmit: PropTypes.func.isRequired,
};

const defaultProps = {
	discussions: [],
};

class Discussions extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
		};
		this.openDiscussions = this.openDiscussions.bind(this);
		this.closeDiscussions = this.closeDiscussions.bind(this);
	}

	openDiscussions() {
		this.setState({ isOpen: true });
	}

	closeDiscussions() {
		this.setState({ isOpen: false });
	}

	render() {
		const counts = this.props.discussions.filter((item)=> {
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
						{this.props.discussions.filter((item)=> {
							return item.anchor === this.props.parentHash;
						}).map((item)=> {
							return <DiscussionItem key={item.id} discussion={item} handleReplySubmit={this.props.handleReplySubmit} />;
						})}
					</div>
				}
			</div>
		);
	}
}

Discussions.defaultProps = defaultProps;
Discussions.propTypes = propTypes;
export default Discussions;
