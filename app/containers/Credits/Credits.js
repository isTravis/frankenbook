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
							<p><i>Frankenbook</i> is proudly presented by the Center for Science and the Imagination at Arizona State University, in partnership with The MIT Press and MIT Media Lab. The project is made possible by a generous grant from the Alfred P. Sloan Foundation. </p>

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
								<Link to="/user/c-athena-aktipis">Athena Aktipis</Link><br />
								<Link to="/user/braden-allenby">Braden Allenby</Link><br />
								<Link to="/user/ariel-anbar">Ariel Anbar</Link><br />
								<Link to="/user/samuel-arbesman">Samuel Arbesman</Link><br />
								<Link to="/user/miguel-astor-aguilera">Miguel Astor-Aguilera</Link><br />
								<Link to="/user/bob-beard">Bob Beard</Link><br />
								<Link to="/user/dominic-berry">Dominic Berry</Link><br />
								<Link to="/user/ron-broglio">Ron Broglio</Link><br />
								<Link to="/user/sara-brownell">Sara Brownell</Link><br />
								<Link to="/user/noa-bruhis">Noa Bruhis</Link><br />
								<Link to="/user/carlos-castillo-chavez">Carlos Castillo-Chavez</Link><br />
								<Link to="/user/adam-chodorow">Adam Chodorow</Link><br />
								<Link to="/user/robert-cook-deegan">Robert Cook-Deegan</Link><br />
								<Link to="/user/mary-drago">Mary Drago</Link><br />
								<Link to="/user/lawrence-dritsas">Lawrence Dritsas</Link><br />
								<Link to="/user/jason-ellis">Lawrence Dritsas</Link><br />
								<Link to="/user/joey-eschrich">Joey Eschrich</Link><br />
								<Link to="/user/ed-finn">Ed Finn</Link><br />
								<Link to="/user/liz-and-james-fiacco">James Fiacco</Link><br />
								<Link to="/user/liz-and-james-fiacco">Liz Fiacco</Link><br />
								<Link to="/user/mary-margaret-fonow">Mary Margaret Fonow</Link><br />
								<Link to="/user/joel-gereboff">Joel Gereboff</Link><br />
								<Link to="/user/eileen-gunn">Eileen Gunn</Link><br />
								<Link to="/user/david-h-guston-and-robert-cook-deegan">David H Guston</Link><br />
								<Link to="/user/judith-guston">Judith Guston</Link><br />
								<Link to="/user/kim-hammond">Kim Hammond</Link><br />
								<Link to="/user/chris-hanlon">Chris Hanlon</Link><br />
								<Link to="/user/dehlia-hannah">Dehlia Hannah</Link><br />
								<Link to="/user/sean-a-hayes">Sean A. Hayes</Link><br />
								<Link to="/user/julie-lekstrom-himes">Julie Lekstrom Himes</Link><br />
								<Link to="/user/amanda-holderread-heggen">Amanda Holderread Heggen</Link><br />
								<Link to="/user/nicole-herbots">Nicole Herbots</Link><br />
								<Link to="/user/adam-hosein">Adam Hosein</Link><br />
								<Link to="/user/andrew-dana-hudson">Andrew Dana Hudson</Link><br />
								<Link to="/user/allison-kavey">Allison Kavey</Link><br />
								<Link to="/user/jonathon-keats">Jonathon Keats</Link><br />
								<Link to="/user/douglas-kelley">Douglas Kelley</Link><br />
								<Link to="/user/sally-kitch">Sally Kitch</Link><br />
								<Link to="/user/joel-a-klein">Joel A. Klein</Link><br />
								<Link to="/user/sheldon-krimsky">Sheldon Krimsky</Link><br />
								<Link to="/user/stacey-kuznetsov">Stacey Kuznetsov</Link><br />
								<Link to="/user/jj-latourelle">JJ LaTourelle</Link><br />
								<Link to="/user/devoney-looser">Devoney Looser</Link><br />
								<Link to="/user/arthur-b-markman">Arthur B. Markman</Link><br />
								<Link to="/user/sean-mccafferty">Sean McCafferty</Link><br />
								<Link to="/user/patrick-mcgurrin">Patrick McGurrin</Link><br />
								Manjana Milkoreit<br />
								<Link to="/user/april-miller">April Miller</Link><br />
								<Link to="/user/ben-minteer">Ben Minteer</Link><br />
								<Link to="/user/peter-nagy">Peter Nagy</Link><br />
								<Link to="/user/stephanie-naufel">Stephanie Naufel</Link><br />
								<Link to="/user/annalee-newitz">Annalee Newitz</Link><br />
								<Link to="/user/robert-oppenheimer">Robert Oppenheimer</Link><br />
								<Link to="/user/nicole-piemonte">Nicole Piemonte</Link><br />
								<Link to="/user/corey-pressman">Corey Pressman</Link><br />
								<Link to="/user/alecia-radatz">Alecia Radatz</Link><br />
								<Link to="/user/ramsey-eric-ramsey">Ramsey Eric Ramsey</Link><br />
								<Link to="/user/emily-redman">Emily Redman</Link><br />
								<Link to="/user/samuel-redman">Samuel J. Redman</Link><br />
								<Link to="/user/jason-scott-robert">Jason Scott Robert</Link><br />
								<Link to="/user/hannah-rogers">Hannah Rogers</Link><br />
								<Link to="/user/heather-ross">Heather Ross</Link><br />
								<Link to="/user/kevin-sandler">Kevin Sandler</Link><br />
								<Link to="/user/daniel-sarewitz">Daniel Sarewitz</Link><br />
								<Link to="/user/pablo-schyfter">Pablo Schyfter</Link><br />
								<Link to="/user/verena-schulze-greiving">Verena Schulze-Greiving</Link><br />
								<Link to="/user/richard-c-sha">Richard C. Sha</Link><br />
								<Link to="/user/michelle-n-shiota">Michelle N. Shiota</Link><br />
								<Link to="/user/michael-simeone">Michael Simeone</Link><br />
								<Link to="/user/kerri-slatus">Kerri Slatus</Link><br />
								<Link to="/user/mike-stanford">Mike Stanford</Link><br />
								<Link to="/user/william-k-storey">William K. Storey</Link><br />
								<Link to="/user/jameien-taylor">Jameien Taylor</Link><br />
								<Link to="/user/tiffany-trent">Tiffany Trent</Link><br />
								<Link to="/user/nora-s-vaage">Nora S. Vaage</Link><br />
								<Link to="/user/erin-walker">Erin Walker</Link><br />
								<Link to="/user/steven-weiner">Steven Weiner</Link><br />
								<Link to="/user/damien-patrick-williams">Damien Patrick Williams</Link><br />
								<Link to="/user/melissa-wilson-sayres">Melissa Wilson Sayres</Link><br />
								<Link to="/user/stephani-etheridge-woodson">Stephani Etheridge Woodson</Link><br />
								<Link to="/user/lisa-yaszek">Lisa Yaszek</Link><br />
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
