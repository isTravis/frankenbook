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

const bookContent = require('bookSourceEditor.json');
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
			docRendered: false,
		};
		this.toc = [];
		this.getRoots(bookContent);
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.contentData.putIsLoading
			&& !nextProps.contentData.putIsLoading
			&& !nextProps.contentData.putError
		) {
			console.log('Set new updated time');
			this.setState({ updatedTime: new Date().getTime() });
		}
	}

	getRoots(content) {
		if (content.type === 'heading') {
			this.toc.push({
				tagName: `h${content.attrs.level}`,
				content: content.content[0].text,
				// hash: content.hash
			});
		}
		if (content.content) {
			content.content.map((child)=> {
				return this.getRoots(child);
			});
		}
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
						<Editor
							initialContent={bookContent}
							key={this.state.updatedTime}
							isReadOnly={true}
						>
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
	lensesData: state.lenses,
	loginData: state.login
}))(Book));
