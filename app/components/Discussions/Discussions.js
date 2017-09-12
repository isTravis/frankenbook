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
		this.closeDiscussions = this.closeDiscussions.bind(this);
		this.renderContent = this.renderContent.bind(this);
	}

	openDiscussions() {
		this.setState({ isOpen: true });
	}

	closeDiscussions() {
		this.setState({ isOpen: false });
	}

	renderContent(content) {
		if (!content) { return <div>Empty content</div>; }
		if (content.content) {
			return content.content;
		}
		if (content.children) {
			const childrenContent = content.children.map((child)=> {
				return this.renderContent(child);
			});
			// const className = content.attributes && content.attributes.className && content.attributes.className.join(' ');
			// const id = content.attributes && content.attributes.id || '';
			// const hash = content.hash || '';
			const attributes = {
				// className: className,
				children: childrenContent,
				// key: `section-${hash}`.trim(),
				// id: `${id} ${hash}`.trim(),
			};
			switch (content.tagName) {
			case 'h1':
				return <h1 {...attributes} />;
			case 'h2':
				return <h2 {...attributes} />;
			case 'h3':
				return <h3 {...attributes} />;
			case 'div':
				return <div {...attributes} />;
			case 'p':
				return <p {...attributes} />;
			case 'span':
				return <span {...attributes} />;
			case 'i':
				return <i {...attributes} />;
			case 'a':
				return <a {...attributes} />;
			case 'sup':
				// return <sup {...attributes} />;
				return null;
			case 'blockquote':
				return <blockquote {...attributes} />;
			default:
				return <div {...attributes} />;
			}
		}
		return null;
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
			});
			return prev;
		}, {});

		if (!Object.keys(counts).length) {
			return null;
		}

		if (!this.state.isOpen) {
			return (
				<span className={'discussions-small'} onClick={this.openDiscussions}>
					{Object.keys(counts).map((key)=> {
						return <span className={`key ${key}`}>{counts[key]}</span>;
					})}
				</span>
			);
		}

		return (
			<div className={'discussions-small'}>
				<span className={'key'} onClick={this.closeDiscussions}>Collapse</span>

				<div className={'discussions-large pt-card pt-elevation-2'}>
					{this.props.discussions.filter((item)=> {
						return item.anchor === this.props.parentHash;
					}).map((item)=> {
						return (
							<div className={'discussion-item'}>
								<div className={'image'}>
									<img src={'icon.png'} alt={item.author} />
								</div>
								<div className={'content'}>
									<div className={'author'}>
										<div className={'name'}>{item.author}</div>
										{item.labels.map((label)=> {
											return <div className={`tag ${label}`}>{label}</div>;
										})}
									</div>
									<div className={'content-body'}>
										{this.renderContent(item.content)}
									</div>
								</div>
								<div className={'buttons'}>
									<button className={'pt-button pt-small'}>Reply</button>
								</div>
							</div>
						);
					})}


				</div>
			</div>
		);
	}
}

Discussions.propTypes = propTypes;
export default Discussions;
