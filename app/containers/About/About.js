import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { withRouter, Link } from 'react-router-dom';

require('./about.scss');

const propTypes = {
	location: PropTypes.object.isRequired,
};

class About extends Component {
	componentDidMount() {
		if (this.props.location.hash === '#about-themes') {
			window.scrollTo(0, document.getElementById('about-themes').offsetTop);
		}
	}
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

							<p>To learn more about Arizona State University’s celebration of Frankenstein's bicentennial, visit <a href="http://frankenstein.asu.edu/">frankenstein.asu.edu</a>.</p>

							<p><i>Frankenbook</i> is supported by a generous grant from the <a href="https://sloan.org/">Alfred P. Sloan Foundation</a>.</p>

							<h1>How to Use the Book</h1>
							<p><i>Frankenbook</i> is designed to make reading <i>Frankenstein</i> an interactive, social experience of learning and exploration.</p>

							<ul>
								<li>
									<b>User accounts:</b> You are welcome to read and share passages from the book without creating a user account. However, if you would like to write replies and submit your own annotations, you will need to create an account. <Link to="/signup">Get started here!</Link>
								</li>
								<li>
									<b>Our annotations:</b> We’ve had dozens of experts from a wide variety of intellectual and professional backgrounds annotate the text of Frankenstein. At the end of any paragraph with an annotation attached to it, you’ll see an orange box with a number inside. That number tells you how many different annotations there are on that paragraph. To read the annotations, simply click on the orange box. You can also click the name of the author of any annotation to learn more about them.
								</li>
								<li>
									<b>Themes:</b> Annotations are grouped into 8 different themes. By default, all of the themes are turned on. You can use the "Active Themes" drop-down menu, located at the top of the book page, to toggle themes on and off. Limiting the number of themes you have turned on helps you focus on the ideas and topic you’re most interested in. For example, maybe you’d like to only see annotations on science and technology issues, or maybe you’re primarily interested in the novel’s connections to philosophy and politics. Learn more about the themes.
								</li>
								<li>
									<b>Replies:</b> This project is about sparking conversation and the exchange of ideas. We want to hear what you think! Next to each annotation, you’ll find a "Reply" button. Simply click on that button and begin typing. Replies will appear immediately. You must create a user account and be logged in to write a reply. Media content can be directly embedded into replies by typing '/' and then choosing an element from the menu. Images, videos, and web iFrames can be directly added.
								</li>
								<li>
									<b>Submit your own annotation:</b> We’d love to add your knowledge, expertise, and perspectives to Frankenbook! Registered users can submit annotations for consideration by our team of editors—if the annotations add something new and exciting to the project, they will become a permanent part of Frankenbook. If the paragraph you would like to annotate already has annotations, click on the orange box and begin typing under “New Annotation.” If the paragraph doesn’t have any annotations yet, click on the gray box with a “+” sign and begin typing under “New Annotation.” You must <Link to="/signup">create a user account</Link> and be logged in to submit an annotation.
								</li>
								<li>
									<b>Share a passage:</b> It’s easy to select and share your favorite passage from the novel. Simply click and drag to highlight any passage—anything from a single evocative word to several stirring paragraphs. A round hyperlink icon will appear on the left margin. If you click on that icon, you’ll see a unique URL for that passage, which you can drop into a text or email, or post to the social media platform of your choice.
								</li>
							</ul>
							<h1 id="about-themes">About the Themes</h1>
							<p>Our annotations are organized by themes, to help you learn more about the subjects you’re most interested in:</p>
							<ul>
								<li><b>Equity & Inclusion:</b> Prejudice, social exclusion, and struggles for justice in the novel, in the Romantic Era, and today.</li>
								<li><b>Health & Medicine:</b> Digging into Frankenstein’s preoccupation with health, disease, and the body.</li>
								<li><b>Influences & Adaptations:</b> The stories that influenced Shelley, and how Frankenstein has echoed throughout culture over the past 200 years.</li>
								<li><b>Mary Shelley:</b> The woman at the heart of it all: Mary Shelley’s adventures, relationships, and writing.</li>
								<li><b>Motivations & Sentiments:</b> The emotions, values, ideals, and obsessions that drive human ingenuity.</li>
								<li><b>Philosophy & Politics:</b> The big ideas and political debates that animate Frankenstein and help us understand it today.</li>
								<li><b>Science:</b> Natural science yesterday and today, from ancients and alchemists to Humphry Davy to Marie Curie.</li>
								<li><b>Technology:</b> Historical and emerging Frankensteinian technologies, from steam engines to AI.</li>
							</ul>

							<h1>The Details</h1>

							<p>Frankenbook is powered by <a href="https://www.pubpub.org">PubPub</a>, an open-source digital publication platform developed at The MIT Media Lab and The MIT Press. The project is edited and moderated by the <a href="http://csi.asu.edu/books/vvev/">Center for Science and the Imagination</a> at Arizona State University, in partnership with MIT.</p>
							<p>The foundation for the experience is the book <a href="https://mitpress.mit.edu/books/frankenstein">Frankenstein: Annotated for Scientists, Engineers, and Creators of All Kinds</a>, published by The MIT Press in 2017. Frankenbook builds on that foundation with new multimedia content and an expanded set of annotations, sorted into lenses dedicated to specific themes and subjects, which can be switched on and off at will.</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

About.propTypes = propTypes;
export default withRouter(About);
