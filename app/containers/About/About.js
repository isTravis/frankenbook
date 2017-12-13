import React, { Component } from 'react';
import Helmet from 'react-helmet';

require('./about.scss');

class About extends Component {
	render() {
		return (
			<div className={'about-wrapper'}>
				<Helmet>
					<title>About Frankenbook</title>
				</Helmet>

				<div className={'container small'}>
					<div className={'row'}>
						<div className={'col-12'}>
							<h1>About Frankenbook</h1>
							<p>Here we write out descriptive about section.</p>
							
							<h2>Themes</h2>
							<p>Describe the themes</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default About;
