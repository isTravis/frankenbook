import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Footer from 'components/Footer/Footer';

require('./book.scss');

const propTypes = {
	match: PropTypes.object.isRequired,
};

class Book extends Component {
	render() {
		return (
			<div>
				<div className={'book'}>

					<div className={'container'}>
						<div className={'row'}>
							<div className={'col-12'}>
								<h1>Here is some content!</h1>
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
