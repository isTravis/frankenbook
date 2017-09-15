/* eslint-disable react/no-children-prop */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import ScrollBar from 'components/ScrollBar/ScrollBar';
import Discussions from 'components/Discussions/Discussions';
import { postDiscussion } from 'actions/discussions';

const bookContent = require('source.json');
require('./book.scss');

const propTypes = {
	dispatch: PropTypes.func.isRequired,
	location: PropTypes.object.isRequired,
	lensesData: PropTypes.object.isRequired,
	loginData: PropTypes.object.isRequired,
	discussionsData: PropTypes.object.isRequired,
};

class Book extends Component {
	constructor(props) {
		super(props);

		this.state = {
			docRendered: false,
		};

		this.toc = [];
		this.getRoots(bookContent);

		this.seenStart = false;
		this.seenFinish = false;
		this.renderContent = this.renderContent.bind(this);
		this.handleReplySubmit = this.handleReplySubmit.bind(this);
	}

	componentDidMount() {
		this.setState({ docRendered: true });
	}
	componentWillReceiveProps() {
		this.seenStart = false;
		this.seenFinish = false;
	}

	getRoots(content) {
		if (content.tagName === 'h1' || content.tagName === 'h2' || content.tagName === 'h3') {
			this.toc.push({
				tagName: content.tagName,
				content: content.children[0].content,
				hash: content.hash
			});
		}
		if (content.children) {
			content.children.map((child)=> {
				return this.getRoots(child);
			});
		}
	}

	handleReplySubmit(discussionObject) {
		this.props.dispatch(postDiscussion(discussionObject));
	}

	renderContent(content) {
		const queryObject = queryString.parse(this.props.location.search);
		if (content.hash === queryObject.start) { this.seenStart = true; }
		if (content.hash === queryObject.finish) { this.seenFinish = true; }


		if (queryObject.start && content.hash) {
			if (!this.seenStart) { return null; }
		}
		if (queryObject.finish && content.hash) {
			if (this.seenFinish) { return null; }
		}


		if (content.content) {
			return content.content;
		}
		if (content.attributes && content.attributes.src) {
			return <img src={content.attributes.src} alt={content.attributes.alt} />;
		}
		if (content.children) {
			const childrenContent = content.children.map((child)=> {
				return this.renderContent(child);
			});
			const className = content.attributes && content.attributes.className && content.attributes.className.join(' ') || '';
			const id = content.attributes && content.attributes.id || '';
			const hash = content.hash || '';
			const attributes = {
				className: content.tagName === 'p' ? `${className} p`.trim() : className,
				children: childrenContent,
				key: `section-${hash}`.trim(),
				id: `${id} ${hash}`.trim(),
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
				return (
					<div {...attributes}>
						{childrenContent}
						{/* <div className={'side'}>Link · Discuss</div> */}
						<Discussions
							parentHash={content.hash}
							discussions={this.props.discussionsData.data}
							handleReplySubmit={this.handleReplySubmit}
							replySubmitLoading={this.props.discussionsData.isLoading}
							userId={this.props.loginData.data && this.props.loginData.data.id}
						/>
					</div>
				);
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
		const lensesData = this.props.lensesData.data || [];
		return (
			<div className={'book'}>
				<style>
					{lensesData.map((lens)=> {
						return `.key.${lens.slug}, .pt-tag.${lens.slug} { background-color: ${lens.color}; } `;
					})}
				</style>
				{this.state.docRendered &&
					<ScrollBar toc={this.toc} documentClassName={'book-wrapper'} />
				}
				<div className={'book-wrapper'}>
					<div className={'container'}>
						<div className={'row'}>
							<div className={'col-12'}>
								{/* <h1>Frankenstein</h1>
								<p>Here is a bunch of content.</p>
								<h1>Onto Essays</h1>
								<h1>Lenses</h1>
								<p>Select your lenses by doing the following;</p> */}
								{/* <img src={'images/coverWide.jpg'} alt={'Book Cover'} /> */}
							</div>
						</div>
					</div>
					<div className={'book-content'}>
						{this.renderContent(bookContent)}
					</div>
				</div>
			</div>

		);
	}
}

Book.propTypes = propTypes;
export default withRouter(connect(state => ({
	discussionsData: state.discussions,
	lensesData: state.lenses,
	loginData: state.login
}))(Book));
