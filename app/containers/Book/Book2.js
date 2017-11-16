/* eslint-disable react/no-children-prop */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { Button } from '@blueprintjs/core';
import { Editor } from '@pubpub/editor';
import FormattingMenu from '@pubpub/editor/addons/FormattingMenu';
import HighlightMenu from '@pubpub/editor/addons/HighlightMenu';
import InsertMenu from '@pubpub/editor/addons/InsertMenu';
import Image from '@pubpub/editor/addons/Image';
import ScrollBar from 'components/ScrollBar/ScrollBar';
import Discussions from 'components/Discussions/Discussions';
import DiscussionAddon from 'components/DiscussionAddon/DiscussionAddon';
import { postDiscussion } from 'actions/discussions';
import { putContentData } from 'actions/content';
import { s3Upload, getResizedUrl, generateHash } from 'utilities';

// const bookContent = require('source2.json');
require('./book.scss');

const propTypes = {
	dispatch: PropTypes.func.isRequired,
	location: PropTypes.object.isRequired,
	lensesData: PropTypes.object.isRequired,
	loginData: PropTypes.object.isRequired,
	discussionsData: PropTypes.object.isRequired,
};

const contextTypes = {
	router: PropTypes.object,
	store: PropTypes.object,
};

class Book extends Component {
	constructor(props) {
		super(props);
		this.state = {
			updatedTime: new Date().getTime(),
		};
		this.saveContent = this.saveContent.bind(this);
		this.appendDiscussionBlocks = this.appendDiscussionBlocks.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		// if (this.props.contentData.isLoading
		// 	&& !nextProps.contentData.isLoading
		// 	&& !nextProps.contentData.error
		// ) {
		// 	console.log('Set new updated time');
		// 	this.setState({ updatedTime: new Date().getTime() });
		// }
		if (this.props.contentData.putIsLoading
			&& !nextProps.contentData.putIsLoading
			&& !nextProps.contentData.putError
		) {
			console.log('Set new updated time');
			this.setState({ updatedTime: new Date().getTime() });
		}
	}

	appendDiscussionBlocks(json) {
		console.log(json);
		const outputContent = json.content.map((item)=> {
			if (item.type !== 'paragraph') { return item; }
			console.log('Last type is', item.content[item.content.length -1].type);
			const newItem = {
				...item,
				content: item.content.sort((foo, bar)=> {
					if (foo.type === 'discussion') { return 1; }
					return 0;
				})
			};
			if (newItem[newItem.content.length - 1].type !== 'discussion') {
				const parentHash = findExistingParentHash(item);
				return {
					...item,
					content: [
						...item.content,
						{ type: 'discussion', attrs: { parentHash: generateHash(8) } }
					]
				};
			}
			return newItem;
		});
		console.log('output content is', outputContent);
		return {
			...json,
			content: outputContent
		};
	}
	saveContent() {
		const contentData = this.props.contentData.data || {};
		const json = this.editorRef.getJSON();
		const outputJSON = this.appendDiscussionBlocks(json);
		this.props.dispatch(putContentData(contentData.id, outputJSON));
	}

	render() {
		const lensesData = this.props.lensesData.data || [];
		const contentData = this.props.contentData.data || {};
		const isReadOnly = true;
		console.log('USing this', contentData.json);
		return (
			<div className={'book'}>
				<style>
					{lensesData.map((lens)=> {
						return `.key.${lens.slug}, .pt-tag.${lens.slug} { background-color: ${lens.color}; } `;
					})}
				</style>
				{/*this.state.docRendered &&
					<ScrollBar toc={this.toc} documentClassName={'book-wrapper'} />
				*/}
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
						{/*this.renderContent(bookContent)*/}
						<div className={`input-field pt-form-group ${this.props.contentData.putError ? 'pt-intent-danger' : ''}`}>
							<div className="pt-form-content">
								<Button
									text={'Save'}
									onClick={this.saveContent}
									loading={this.props.contentData.putIsLoading}
								/>
								<div className={`pt-input-group ${this.props.contentData.putError ? 'pt-intent-danger' : ''}`}>
									<div className="pt-form-helper-text">{this.props.contentData.putError}</div>
								</div>
							</div>
						</div>
						
						<Editor
							ref={(ref)=> { this.editorRef = ref; console.log(ref);}}
							initialContent={contentData.json}
							key={this.state.updatedTime}
							onChange={(val)=> {console.log(val);}}
							isReadOnly={true}
						>
							{!isReadOnly &&
								<FormattingMenu />
							}
							{!isReadOnly &&
								<InsertMenu />
							}
							<Image
								handleFileUpload={s3Upload}
								handleResizeUrl={(url)=> { return getResizedUrl(url, 'fit-in', '800x0'); }}
							/>
							<DiscussionAddon
								routerContext={this.context.router}
								storeContext={this.context.store}
							/>
							<HighlightMenu
								highlights={[]}
								primaryEditorClassName={'book-content'}
								hoverBackgroundColor={'aqua'}
							/>
						</Editor>
					</div>
				</div>
			</div>

		);
	}
}

Book.propTypes = propTypes;
Book.contextTypes = contextTypes;
export default withRouter(connect(state => ({
	discussionsData: state.discussions,
	contentData: state.content,
	lensesData: state.lenses,
	loginData: state.login
}))(Book));
