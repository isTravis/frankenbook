/* eslint-disable react/no-children-prop */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import queryString from 'query-string';
import ScrollBar from 'components/ScrollBar/ScrollBar';

const bookContent = require('source.json');
require('./book.scss');

const propTypes = {
	location: PropTypes.object.isRequired,
};

class Book extends Component {
	constructor(props) {
		super(props);

		this.state = {
			docRendered: false,
		};

		this.seenStart = false;
		this.seenFinish = false;
		this.renderContent = this.renderContent.bind(this);
	}

	componentWillMount() {
		Book.getRoots(bookContent);
	}
	componentDidMount() {
		this.setState({ docRendered: true });
	}
	componentWillReceiveProps() {
		this.seenStart = false;
		this.seenFinish = false;
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
			const className = content.attributes && content.attributes.className && content.attributes.className.join(' ');
			const id = content.attributes && content.attributes.id || '';
			const hash = content.hash || '';
			const attributes = {
				className: className,
				children: childrenContent,
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
				return <p {...attributes} />;
			case 'span':
				return <span {...attributes} />;
			case 'i':
				return <i {...attributes} />;
			case 'a':
				return <a {...attributes} />;
			case 'sup':
				return <sup {...attributes} />;
			case 'blockquote':
				return <blockquote {...attributes} />;
			default:
				return <div {...attributes} />;
			}
		}
		return null;
	}

	static toc = [];

	static getRoots(content) {
		if (content.tagName === 'h1' || content.tagName === 'h2' || content.tagName === 'h3') {
			Book.toc.push({ tagName: content.tagName, content: content.children[0].content, hash: content.hash });
		}
		if (content.children) {
			content.children.map((child)=> {
				return Book.getRoots(child);
			});
		}
	}

	render() {
		console.log(bookContent);
		console.log(Book.toc);

		return (
			<div className={'book'}>
				<div style={{ position: 'absolute' }}>
					<Link className={'pt-button'} to={'/?start=075db3&finish=ab0e34'}>Small</Link>
					<Link className={'pt-button'} to={'/'}>Big</Link>
				</div>
				{this.state.docRendered &&
					<ScrollBar toc={Book.toc} documentClassName={'book-wrapper'} />
				}
				<div className={'book-wrapper'}>
					<div className={'container'}>
						<div className={'row'}>
							<div className={'col-12'}>
								<h1>Frankenstein</h1>
								<p>Here is a bunch of content.</p>
								<h1>Onto Essays</h1>
								<h1>Lenses</h1>
								<p>Select your lenses by doing the following;</p>
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
export default withRouter(Book);
