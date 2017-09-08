/* eslint-disable react/no-children-prop */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Footer from 'components/Footer/Footer';

const bookContent = require('source.json');
require('./book.scss');

const propTypes = {
	match: PropTypes.object.isRequired,
};

class Book extends Component {
	static renderContent(content) {
		if (content.content) {
			return content.content;
		}
		if (content.children) {
			const childrenContent = content.children.map((child)=> {
				return Book.renderContent(child);
			});
			const className = content.attributes && content.attributes.className && content.attributes.className.join(' ');
			switch (content.tagName) {
			case 'h1':
				return <h1 className={className} children={childrenContent} />;
			case 'h2':
				return <h2 className={className} children={childrenContent} />;
			case 'h3':
				return <h3 className={className} children={childrenContent} />;
			case 'div':
				return <div className={className} children={childrenContent} />;
			case 'p':
				return <p className={className} children={childrenContent} />;
			case 'span':
				return <span className={className} children={childrenContent} />;
			case 'i':
				return <i className={className} children={childrenContent} />;
			case 'a':
				return <a className={className} children={childrenContent} />;
			case 'sup':
				return <sup className={className} children={childrenContent} />;
			default:
				return <div className={className} children={childrenContent} />;
			}
		}
		return null;
	}

	render() {
		console.log(bookContent);

		return (
			<div>
				<div className={'book'}>

					<div className={'container'}>
						<div className={'row'}>
							<div className={'col-12'}>
								{Book.renderContent(bookContent)}
							</div>
						</div>
					</div>
				</div>

				<Footer />

			</div>
		);
	}
}

Book.propTypes = propTypes;
export default withRouter(Book);
