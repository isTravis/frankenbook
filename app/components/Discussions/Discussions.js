import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DiscussionItem from 'components/DiscussionItem/DiscussionItem';

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
		this.closeDiscussions = this.closeDiscussions.bind(this);
		// this.renderContent = this.renderContent.bind(this);
	}

	openDiscussions() {
		this.setState({ isOpen: true });
	}

	closeDiscussions() {
		this.setState({ isOpen: false });
	}

	// renderContent(content) {
	// 	if (!content) { return <div>Empty content</div>; }
	// 	if (content.content) {
	// 		return content.content;
	// 	}
	// 	if (content.children) {
	// 		const childrenContent = content.children.map((child)=> {
	// 			return this.renderContent(child);
	// 		});
	// 		const attributes = {
	// 			children: childrenContent,
	// 		};
	// 		switch (content.tagName) {
	// 		case 'h1':
	// 			return <h1 {...attributes} />;
	// 		case 'h2':
	// 			return <h2 {...attributes} />;
	// 		case 'h3':
	// 			return <h3 {...attributes} />;
	// 		case 'div':
	// 			return <div {...attributes} />;
	// 		case 'p':
	// 			return <p {...attributes} />;
	// 		case 'span':
	// 			return <span {...attributes} />;
	// 		case 'i':
	// 			return <i {...attributes} />;
	// 		case 'a':
	// 			return <a {...attributes} />;
	// 		case 'sup':
	// 			// return <sup {...attributes} />;
	// 			return null;
	// 		case 'blockquote':
	// 			return <blockquote {...attributes} />;
	// 		default:
	// 			return <div {...attributes} />;
	// 		}
	// 	}
	// 	return null;
	// }

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
							return <span className={`key ${key}`}>{counts[key]}</span>;
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
							return <DiscussionItem discussion={item} />;
						})}
					</div>
				}
			</div>
		);
	}
}

Discussions.propTypes = propTypes;
export default Discussions;
