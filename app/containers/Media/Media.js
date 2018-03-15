import React, { Component } from 'react';
import Helmet from 'react-helmet';

require('./media.scss');

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

							<h2>Step into the lab to build solutions to today’s vexing questions</h2>
							<a href="http://www.bluecadet.com/projects/modern-monsters/#/">
								<img alt="Modern Monsters" src="/images/modernMonsters.jpg" width="100%" />
							</a>
							<p><a href="http://www.bluecadet.com/projects/modern-monsters/#/">Click to step into the lab.</a></p>

							<h2>A Year Without a Summer</h2>
							<iframe width="100%" height="300" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/269203861&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true" />

							<h2>Lab Assistant</h2>
							<a href="https://lizfiacco.itch.io/lab-assistant">
								<img alt="Lab Assistant" src="/images/lab-assistant.jpg" width="100%" />
							</a>
							<p><a href="https://lizfiacco.itch.io/lab-assistant">Click to play Lab Assistant.</a></p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Media;
