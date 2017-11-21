import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import { Button } from '@blueprintjs/core';
import Avatar from 'components/Avatar/Avatar';
import { Editor } from '@pubpub/editor';
import FormattingMenu from '@pubpub/editor/addons/FormattingMenu';
import HighlightMenu from '@pubpub/editor/addons/HighlightMenu';
import InsertMenu from '@pubpub/editor/addons/InsertMenu';
import Image from '@pubpub/editor/addons/Image';
import Video from '@pubpub/editor/addons/Video';
import { s3Upload, getResizedUrl, generateHash } from 'utilities';

require('./discussionItem.scss');

const propTypes = {
	discussion: PropTypes.object.isRequired,
	handleReplySubmit: PropTypes.func,
	replySubmitLoading: PropTypes.bool,
	userId: PropTypes.string,
	isProfile: PropTypes.bool,
};

const defaultProps = {
	handleReplySubmit: undefined,
	replySubmitLoading: false,
	userId: undefined,
	isProfile: false,
};

class DiscussionItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			replyOpen: false,
			replyText: '',
		};
		this.toggleReply = this.toggleReply.bind(this);
		this.onReplyChange = this.onReplyChange.bind(this);
		this.onReplySubmit = this.onReplySubmit.bind(this);
		this.renderContent = this.renderContent.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.replySubmitLoading && !nextProps.replySubmitLoading) {
			this.setState({ replyText: '' });
		}
	}

	onReplyChange(evt) {
		// this.setState({ replyText: evt.target.value });
		this.setState({ replyText: evt });
	}

	onReplySubmit() {
		this.props.handleReplySubmit({
			userId: this.props.userId,
			anchor: this.props.discussion.anchor,
			parentId: this.props.discussion.id,
			content: {
				type: 'text',
				content: this.state.replyText,
			}
		});
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
		const labels = item.labels || [];
		const replies = item.replies || [];
		return (
			<div className={'discussion-item'}>
				<div className={'image'}>
					<Link replace={this.props.isProfile} to={`/user/${item.author.slug}`}>
						<Avatar
							userAvatar={item.author.avatar}
							userInitials={item.author.initials}
							width={24}
						/>
					</Link>
				</div>

				<div className={'content'}>
					<div className={'author'}>
						<Link replace={this.props.isProfile} to={`/user/${item.author.slug}`} className={'name'}>{item.author.fullName}</Link>
						<TimeAgo date={item.createdAt} className={'date'} />
						<div>
							{labels.map((label)=> {
								return <div key={`${item.id}-${label.id}`} className={`pt-tag ${label.slug}`}>{label.title}</div>;
							})}
						</div>
					</div>

					<div className={'content-body'}>
						{this.renderContent(item.content)}
					</div>

					{this.state.replyOpen &&
						<div className={'replies'}>
							{replies.sort((foo, bar)=> {
								if (foo.createdAt > bar.createdAt) { return 1; }
								if (foo.createdAt < bar.createdAt) { return -1; }
								return 0;
							}).map((reply)=> {
								// Wrap it in a div so it is last-of-type and doesn't get border-bottom
								return (
									<div key={`reply-${reply.id}`}>
										<DiscussionItem discussion={reply} />
									</div>
								);
							})}
						</div>
					}

					{this.state.replyOpen &&
						<div className={'replies'}>
							{/*<textarea
								placeholder={'Reply to discussion'}
								className={'pt-input pt-fill'}
								value={this.state.replyText}
								onChange={this.onReplyChange}
							/>*/}
							<div className={'reply-editor'}>
								<Editor
									placeholder={'Reply to discussion'}
									onChange={this.onReplyChange}
								>
									<FormattingMenu />
									<InsertMenu />
									<Image
										handleFileUpload={s3Upload}
										handleResizeUrl={(url)=> { return getResizedUrl(url, 'fit-in', '800x0'); }}
									/>
									<Video
										handleFileUpload={s3Upload}
									/>
								</Editor>
							</div>
							<Button
								onClick={this.onReplySubmit}
								disabled={!this.state.replyText || !this.props.userId}
								className={'pt-button pt-intent-primary'}
								loading={this.props.replySubmitLoading}
								text={this.props.userId ? 'Submit' : 'Login to Reply'}
							/>
						</div>
					}
				</div>

				{this.props.handleReplySubmit &&
					<div className={'buttons'}>
						<button className={'pt-button pt-small'} onClick={this.toggleReply}>
							{this.state.replyOpen ? 'Close' : `Reply · ${replies.length}`}
						</button>
					</div>
				}
			</div>
		);
	}
}

DiscussionItem.defaultProps = defaultProps;
DiscussionItem.propTypes = propTypes;
export default DiscussionItem;
