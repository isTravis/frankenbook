import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { withRouter, Link } from 'react-router-dom';

require('./credits.scss');

const propTypes = {
	location: PropTypes.object.isRequired,
};

class Credits extends Component {
	render() {
		return (
			<div className={'credits-wrapper'}>
				<Helmet>
					<title>Credits · Frankenbook</title>
				</Helmet>

				<div className={'container narrow'}>
					<div className={'row'}>
						<div className={'col-12'}>
							<h1>Credits</h1>
							<i>Frankenbook</i> is proudly presented by the Center for Science and the Imagination at Arizona State University, in partnership with The MIT Press and MIT Media Lab. The project is made possible by a generous grant from the Alfred P. Sloan Foundation. 

							<h3>Editors</h3>
							<p>
								David H. Guston <br/>
								Ed Finn <br/>
								Jason Scott Robert
							</p>

							<h3>Technical Development</h3>
							<p>
								Travis Rich<br />
								Catherine Ahearn	
							</p>

							<h3>Digital Editors</h3>
							<p>
								Bob Beard<br />
								Joey Eschrich<br />
								Ruth Wylie	
							</p>

							<h3>Publisher</h3>
							<p>Amy Brand</p>

							<h3>Publishing Editor</h3>
							<p>Gita Devi Manaktala</p>

							<h3>Proofreader</h3>
							<p>Tamara Grasty</p>

							<h3>Title and Icon Designer</h3>
							<p>Nina Miller</p>

							<h3>Theme Icons</h3>
							<p>Courtesy of Adam Beasley, Gregor Cresnar, and Misha, via The Noun Project</p>

							<h3>Video Production</h3>
							<p>Massive Science, massivesci.com</p>

							<h3>Annotators</h3>
							<p>
								Athena Aktipis<br />
								Braden Allenby<br />
								Ariel Anbar<br />
								Samuel Arbesman<br />
								Miguel Astor-Aguilera<br />
								Bob Beard<br />
								Dominic Berry<br />
								Ron Broglio<br />
								Sara Brownell<br />
								Noa Bruhis<br />
								Carlos Castillo-Chavez<br />
								Adam Chodorow<br />
								Robert Cook-Deegan<br />
								Mary Drago<br />
								Lawrence Dritsas<br />
								Jason W. Ellis<br />
								Joey Eschrich<br />
								Ed Finn<br />
								James Fiacco<br />
								Liz Fiacco<br />
								Mary Margaret Fonow<br />
								Joel Gereboff<br />
								Eileen Gunn<br />
								David H. Guston<br />
								Judith Guston<br />
								Kim Hammond<br />
								Chris Hanlon<br />
								Dehlia Hannah<br />
								Sean A. Hays<br />
								Julie Lekstrom Himes<br />
								Amanda Holderread Heggen<br />
								Nicole Herbots<br />
								Adam Hosein<br />
								Andrew Dana Hudson<br />
								Allison Kavey<br />
								Jonathon Keats<br />
								Douglas Kelley<br />
								Sally Kitch<br />
								Joel A. Klein<br />
								Sheldon Krimsky<br />
								Stacey Kuznetsov<br />
								JJ LaTourelle<br />
								Devoney Looser<br />
								Arthur B. Markman<br />
								Sean McCafferty<br />
								Patrick McGurrin<br />
								Manjana Milkoreit<br />
								April Miller<br />
								Ben Minteer<br />
								Peter Nagy<br />
								Stephanie Naufel<br />
								Annalee Newitz<br />
								Robert Oppenheimer<br />
								Nicole Piemonte<br />
								Corey Pressman<br />
								Alecia Radatz<br />
								Ramsey Eric Ramsey<br />
								Emily Redman<br />
								Samuel J. Redman<br />
								Jason Scott Robert<br />
								Hannah Rogers<br />
								Heather Ross<br />
								Kevin Sandler<br />
								Daniel Sarewitz<br />
								Pablo Schyfter<br />
								Verena Schulze-Greiving<br />
								Richard C. Sha<br />
								Michelle N. Shiota<br />
								Michael Simeone<br />
								Kerri Slatus<br />
								Mike Stanford<br />
								William K. Storey<br />
								Jameien Taylor<br />
								Tiffany Trent<br />
								Nora S. Vaage<br />
								Erin Walker<br />
								Steven Weiner<br />
								Damien Patrick Williams<br />
								Melissa Wilson Sayres<br />
								Stephani Etheridge Woodson<br />
								Lisa Yaszek<br />
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Credits.propTypes = propTypes;
export default withRouter(Credits);
