import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputField from 'components/InputField/InputField';

require('./discussionItem.scss');

const propTypes = {
	discussion: PropTypes.object.isRequired,
};

class Discussions extends Component {
	constructor(props) {
		super(props);
		this.state = {
			replyOpen: false,
			replyText: '',
		};
		this.toggleReply = this.toggleReply.bind(this);
		this.renderContent = this.renderContent.bind(this);
	}

	toggleReply() {
		this.setState({ replyOpen: !this.state.replyOpen });
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
			const attributes = {
				children: childrenContent,
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
		const item = this.props.discussion;
		return (
			<div className={'discussion-item'}>
				<div className={'image'}>
					<img src={'icon.png'} alt={item.author} />
				</div>
				<div className={'content'}>
					<div className={'author'}>
						<div className={'name'}>{item.author}</div>
						{item.labels.map((label)=> {
							return <div className={`pt-tag ${label}`}>{label}</div>;
						})}
					</div>
					<div className={'content-body'}>
						{this.renderContent(item.content)}
					</div>
					{this.state.replyOpen &&
						<div className={'replies'}>
							<InputField
								placeholder={'Reply to this discussions'}
							/>

						</div>
					}
				</div>
				<div className={'buttons'}>
					<button className={'pt-button pt-small'} onClick={this.toggleReply}>
						{this.state.replyOpen ? 'Close' : 'Reply'}
					</button>
				</div>
			</div>
		);
	}
}

Discussions.propTypes = propTypes;
export default Discussions;
