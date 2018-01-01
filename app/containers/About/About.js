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

				<div className={'container narrow'}>
					<div className={'row'}>
						<div className={'col-12'}>
							<h1>About Frankenbook</h1>
							
							<p><i>Frankenbook</i> is a collective reading and collaborative annotation experience of the original 1818 text of <i>Frankenstein; or, The Modern Prometheus</i>, by Mary Wollstonecraft Shelley. The project launched in January 2018, as part of Arizona State University’s celebration of the novel’s 200th anniversary. Even two centuries later, Shelley’s modern myth continues to shape the way people imagine science, technology, and their moral consequences. <i>Frankenbook</i> gives readers the opportunity to trace the scientific, technological, political, and ethical dimensions of the novel, and to learn more about its historical context and enduring legacy.</p>
 
							<p><i>Frankenbook</i> is powered by <a href={'https://www.pubpub.org'}>PubPub</a>, an open-source digital publication platform developed at The MIT Media Lab and The MIT Press. The project is edited and moderated by the <a href={'http://csi.asu.edu/'}>Center for Science and the Imagination</a> at Arizona State University, in partnership with MIT.</p>

							<p>The foundation for the experience is the book <a href={'https://mitpress.mit.edu/books/frankenstein'}><i>Frankenstein: Annotated for Scientists, Engineers, and Creators of All Kinds</i></a>, published by The MIT Press in 2017. <i>Frankenbook</i> builds on that foundation with new multimedia content and an expanded set of annotations, sorted into lenses dedicated to specific themes and subjects, which can be switched on and off at will.</p>

							<p>Readers can add their own annotations to <i>Frankenbook</i>, and opt to have those annotations considered for inclusion in the source text managed by the Center for Science and the Imagination, or keep those annotations private. The platform also enables users to create their own bespoke versions of the book, blending their own annotations with annotations from specific lenses. These unique versions of the text are easy to share with friends, students, classmates, book clubs, and other groups.</p>

							<p>To learn more about Arizona State University’s celebration of <i>Frankenstein</i>'s bicentennial, visit <a href={'http://frankenstein.asu.edu/'}>frankenstein.asu.edu</a>.</p>

							<p><i>Frankenbook</i> is supported by a generous grant from the <a href={'https://sloan.org/'}>Alfred P. Sloan Foundation</a>.</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default About;
