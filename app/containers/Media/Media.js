import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { withRouter, Link } from 'react-router-dom';

class Media extends Component {

	render() {
		return (
			<div className={'media-wrapper'}>
				<Helmet>
					<title>Media</title>
				</Helmet>

				<div className={'container small'}>
					<div className={'row'}>
						<div className={'col-12'}>
							<h1>Media</h1>

							<iframe width="100%" height="350" src="https://www.youtube.com/embed/v3sQMFGxZTM" frameborder="0" allowfullscreen></iframe>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Media;
