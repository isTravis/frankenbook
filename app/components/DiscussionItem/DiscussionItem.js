import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import Avatar from 'components/Avatar/Avatar';
import DiscussionInput from 'components/DiscussionInput/DiscussionInput';
import { Editor } from '@pubpub/editor';
import HighlightQuote from '@pubpub/editor/addons/HighlightQuote';
import Image from '@pubpub/editor/addons/Image';
import Video from '@pubpub/editor/addons/Video';
import Iframe from '@pubpub/editor/addons/Iframe';
import { getResizedUrl } from 'utilities';

require('./discussionItem.scss');

const propTypes = {
	discussion: PropTypes.object.isRequired,
	handleReplySubmit: PropTypes.func,
	handleEditSubmit: PropTypes.func,
	saveDiscussionLoading: PropTypes.string,
	userId: PropTypes.string,
	isProfile: PropTypes.bool,
	rightButtons: PropTypes.node
};

const defaultProps = {
	handleReplySubmit: undefined,
	handleEditSubmit: undefined,
	saveDiscussionLoading: false,
	userId: undefined,
	isProfile: false,
	rightButtons: undefined,
};

class DiscussionItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			replyOpen: false,
			replyText: '',
			editorKey: new Date().getTime(),
			isEditing: false,
		};
		this.replyEditor = undefined;
		this.toggleReply = this.toggleReply.bind(this);
		this.toggleEditing = this.toggleEditing.bind(this);
		this.onReplySubmit = this.onReplySubmit.bind(this);
		this.onEditSubmit = this.onEditSubmit.bind(this);
		this.handleReplyChange = this.handleReplyChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		const item = this.props.discussion;
		if (this.props.saveDiscussionLoading === `${item.anchor}-${item.id}-reply`
			&& this.props.saveDiscussionLoading
			&& !nextProps.saveDiscussionLoading
		) {
			this.setState({
				editorKey: new Date().getTime(),
			});
		}

		if (this.props.saveDiscussionLoading === `${item.id}`
			&& this.props.saveDiscussionLoading
			&& !nextProps.saveDiscussionLoading
		) {
			this.setState({
				isEditing: false,
			});
		}
	}

	onReplySubmit(replyData) {
		this.props.handleReplySubmit({
			userId: this.props.userId,
			anchor: this.props.discussion.anchor,
			parentId: this.props.discussion.id,
			content: replyData.content,
			text: replyData.text
		});
	}
	onEditSubmit(editedData) {
		this.props.handleEditSubmit({
			id: this.props.discussion.id,
			content: editedData.content,
			text: editedData.text
		});
	}
	handleReplyChange() {
		this.setState({
			replyText: this.replyEditor.view.state.doc.textContent,
		});
	}

	toggleEditing() {
		this.setState({ isEditing: !this.state.isEditing });
	}
	toggleReply() {
		this.setState({ replyOpen: !this.state.replyOpen });
	}

	render() {
		const item = this.props.discussion;
		const labels = item.labels || [];
		const replies = item.replies || [];
		const isAuthor = this.props.userId === item.author.id;
		return (
			<div className={'discussion-item'}>
				<div className={'discussion-header'}>
					<div className={'image'}>
						<Link replace={this.props.isProfile} to={`/user/${item.author.slug}`}>
							<Avatar
								userAvatar={item.author.avatar}
								userInitials={item.author.initials}
								width={24}
								endorsed={item.endorsed}
							/>
						</Link>
						{/* item.endorsed &&
							<img className={'endorsed-image'} alt={'Editorially Approved'} src={'/headerLogo_old.png'} />
						*/}
					</div>

					<div className={'author'}>
						<Link replace={this.props.isProfile} to={`/user/${item.author.slug}`} className={'name'}>{item.author.fullName}</Link>
						<TimeAgo date={item.createdAt} className={'date'} />
						<div>
							{item.endorsed &&
								<div className={'pt-tag editorial-tag'}>
									<img alt={'Editorially Approved'} src={'headerLogo.png'} />
								</div>
							}
							{labels.map((label)=> {
								return <div key={`${item.id}-${label.id}`} className={`pt-tag ${label.slug}`}>{label.title}</div>;
							})}
						</div>
					</div>

					<div className={'buttons'}>
						{isAuthor && this.props.handleEditSubmit &&
							<button className={'pt-button pt-small'} onClick={this.toggleEditing}>
								{this.state.isEditing ? 'Cancel' : `Edit`}
							</button>
						}
						{!item.parentId && (this.props.handleReplySubmit || !!replies.length) &&
							<button className={'pt-button pt-small'} onClick={this.toggleReply}>
								{this.state.replyOpen ? 'Close' : `Reply · ${replies.length}`}
							</button>
						}
						{this.props.rightButtons}
					</div>
				</div>

				<div className={'content'}>
					<div className={'content-body'}>
						{!this.state.isEditing &&
							<Editor
								initialContent={item.content}
								isReadOnly={true}
							>
								<HighlightQuote
									getHighlightContent={()=>{}}
								/>
								<Image
									handleResizeUrl={(url)=> { return getResizedUrl(url, 'fit-in', '800x0'); }}
								/>
								<Video />
								<Iframe />
							</Editor>
						}
						{this.state.isEditing &&
							<DiscussionInput
								initialContent={this.props.discussion.content}
								handleSubmit={this.onEditSubmit}
								isReply={!!item.parentId}
								submitIsLoading={this.props.saveDiscussionLoading === item.id}
								getHighlightContent={()=>{}}
								userId={this.props.userId}
							/>
						}
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
									<div key={`reply-${reply.id}`} className={'reply'}>
										<DiscussionItem
											discussion={reply}
											saveDiscussionLoading={this.props.saveDiscussionLoading}
											userId={this.props.userId}
											handleReplySubmit={this.props.handleReplySubmit}
											handleEditSubmit={this.props.handleEditSubmit}
										/>
									</div>
								);
							})}
						</div>
					}

					{this.state.replyOpen && this.props.handleReplySubmit &&
						<div className={'reply-input'}>
							<DiscussionInput
								handleSubmit={this.onReplySubmit}
								isReply={true}
								submitIsLoading={this.props.saveDiscussionLoading === `${item.anchor}-${item.id}-reply`}
								getHighlightContent={()=>{}}
								userId={this.props.userId}
							/>
						</div>
					}
				</div>
			</div>
		);
	}
}

DiscussionItem.defaultProps = defaultProps;
DiscussionItem.propTypes = propTypes;
export default DiscussionItem;
