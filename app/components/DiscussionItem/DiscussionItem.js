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
import { getResizedUrl } from 'utilities';

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
			editorKey: new Date().getTime(),
		};
		this.replyEditor = undefined;
		this.toggleReply = this.toggleReply.bind(this);
		this.onReplySubmit = this.onReplySubmit.bind(this);
		this.handleReplyChange = this.handleReplyChange.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.replySubmitLoading && !nextProps.replySubmitLoading) {
			this.setState({ editorKey: new Date().getTime() });
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
	handleReplyChange() {
		this.setState({
			replyText: this.replyEditor.view.state.doc.textContent,
		});
	}
	toggleReply() {
		this.setState({ replyOpen: !this.state.replyOpen });
	}

	render() {
		const item = this.props.discussion;
		const labels = item.labels || [];
		const replies = item.replies || [];
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
					</div>

					<div className={'author'}>
						<Link replace={this.props.isProfile} to={`/user/${item.author.slug}`} className={'name'}>{item.author.fullName}</Link>
						<TimeAgo date={item.createdAt} className={'date'} />
						<div>
							{labels.map((label)=> {
								return <div key={`${item.id}-${label.id}`} className={`pt-tag ${label.slug}`}>{label.title}</div>;
							})}
						</div>
					</div>

					{this.props.handleReplySubmit &&
						<div className={'buttons'}>
							<button className={'pt-button pt-small'} onClick={this.toggleReply}>
								{this.state.replyOpen ? 'Close' : `Reply · ${replies.length}`}
							</button>
						</div>
					}
				</div>

				<div className={'content'}>

					<div className={'content-body'}>
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
						</Editor>
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
										<DiscussionItem discussion={reply} />
									</div>
								);
							})}
						</div>
					}

					{this.state.replyOpen &&
						<div className={'reply-input'}>
							<DiscussionInput
								handleSubmit={this.onReplySubmit}
								isReply={true}
								submitIsLoading={this.props.replySubmitLoading}
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
