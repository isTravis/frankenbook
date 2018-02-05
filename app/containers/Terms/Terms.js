import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { withRouter, Link } from 'react-router-dom';

require('./terms.scss');

const propTypes = {
	location: PropTypes.object.isRequired,
};

class Terms extends Component {
	render() {
		return (
			<div className={'terms-wrapper'}>
				<Helmet>
					<title>Terms</title>
				</Helmet>

				<div className={'container narrow'}>
					<div className={'row'}>
						<div className={'col-12'}>
							<h1>Terms of Service</h1>
							<p><i>Frankenbook</i> is a project of the Center for Science and the Imagination at Arizona State University (“ASU”) and the Media Lab and The MIT Press at the Massachusetts Institute of Technology (“MIT”). <i>Frankenbook</i> is a collective reading and collaborative annotation experience of the original text of Frankenstein; or, The Modern Prometheus, by Mary Wollstonecraft Shelley.</p>
							<p><i>Frankenbook</i> reserves the right to change the terms of the Terms of Service ("TOS") or to modify its features at any time. The Site will post changes to the terms of this User Agreement <a href="/terms">here</a>, and by accessing the Site after modifications to this User Agreement have been posted, you agree to be bound by all the modified terms.</p>
							<h2>Acceptance of Terms</h2>
							<p>By accessing content on the <i>Frankenbook</i> website (the “Site”), which includes all pages within the frankenbook.org host directory and subdomains, and all affiliated services,</p>
							<ol>
								<li>You accept and agree to be bound by all of the terms of this TOS; and</li>
								<li>You affirm that you are either 13 years of age or older.</li>
							</ol>
							<p>You must be 13 years or over. If we discover or have any reason to suspect that you have not met this condition, then we reserve the right to suspend or terminate your registration to this Site immediately and without notice.</p>
							<h2>Use of the Site</h2>
							<p>For the purposes of this TOS, the term “Site Content” shall include all content, features, and functionality posted to the Site by <i>Frankenbook</i> as well as User-Generated Content.</p>
							<p>Except where otherwise noted, Site Content is licensed under the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) License and may be used under the terms of that license or any later version of a Creative Commons Attribution License.</p>
							<h2>Use of Third-Party Content</h2>
							<p>To the extent the Site incorporates the copyrighted material of third-parties (“Third-Party Content”), you represent, warrant, and agree that no Third-Party Content posted or otherwise shared by you on or through any of the Site, violates or infringes upon the rights of any third-party, including copyright, trademark, privacy, publicity, or other personal or proprietary rights, breaches or conflicts with any obligation, such as a confidentiality obligation, or contains libelous, defamatory, or otherwise unlawful material.</p>
							<p>ASU and MIT do not warrant that any use of Third-Party Content will not infringe the rights of the content owners.</p>
							<p>If you believe that any content on the Site infringes your copyrights, please click here for more information, including the email address for MIT’s DMCA agent, to whom copyright infringement notifications should be sent.</p>
							<h2>User-Generated Content</h2>
							<p>The Site includes features that support and publish User-Generated Content. The term “User-Generated Content,” for purposes of this TOS, means any copyrightable content that users submit to the Site. You shall not make use of these features:</p>
							<ul>
								<li>To make comments that are threatening, knowingly false, or unlawful; or to engage in personal attacks;</li>
								<li>To impersonate any person or entity or create a false identity on the Site;</li>
								<li>To harass, threaten, stalk, embarrass or cause distress, unwanted attention or discomfort to any user of the Site;</li>
								<li>To disseminate or transmit “spam,” unsolicited messages, chain letters, advertisements, solicitations, or other unsolicited commercial communications, including (but not limited to) communications describing investment opportunities;</li>
								<li>To post material that infringes a copyright, trademark or patent right, trade secret or other legal right of any person, corporation or institution;</li>
								<li>To knowingly disseminate or transmit viruses, Trojan horses, worms, defects, date bombs, time bombs, malware, spyware, or other items of a destructive nature or any other malicious code or program;</li>
								<li>To knowingly carry out any action with the intent or effect of disrupting other users’ experience of the Site, such as intentionally causing a chat screen to scroll faster than other users are able to read, or deploying macros with large amounts of text for the purpose of disrupting the normal flow of user chats.</li>
							</ul>
							<p>By submitting User-Generated Content, you represent, warrant, and agree that no User-Generated Content posted or otherwise shared by you on or through any of the Site, violates or infringes upon the rights of any third-party, including copyright, trademark, privacy, publicity, or other personal or proprietary rights, breaches or conflicts with any obligation, such as a confidentiality obligation, or contains libelous, defamatory, or otherwise unlawful material.</p>
							<p>You hereby agree that User-Generated Content: (a) is hereby licensed under the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) License and may be used under the terms of that license or any later version of a Creative Commons Attribution License, or (b) is in the public domain (such as Content that is not copyrightable or Content you make available under CC0, a designation whereby you can waive all copyrights and related or neighboring rights in all jurisdictions worldwide), or (c) if not owned by you, (i) is available under a Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) License or (ii) is a media file that is available under any Creative Commons license or that you are authorized by law to post or share through any of the Services, such as under the fair use doctrine, and that is prominently marked as being subject to third-party copyright. All of Your Content must be appropriately marked with licensing and attribution information.</p>
							<p>Upon publishing, an archive of the content will perpetually be available to the public for reference.</p>
							<p>You acknowledge and accept that User-Generated Content posted to the Site may be made available for the public to access, view, and use, subject to the limited license set forth above (“Use of Site”).</p>
							<p><i>Frankenbook</i> monitors User-Generated Content on the Site, and <i>Frankenbook</i> reserves the right to modify, edit, or remove any of said content at its discretion, without notice, and for any reason. <i>Frankenbook</i> may prescreen User-Generated Content and may decide, in its discretion, without notice, and for any reason, not to publish it. By submitting an annotation to the site, you give <i>Frankenbook</i> permission to edit the content for clarity, factual accuracy, spelling, grammar, and adherence to our house style guide. <i>Frankenbook</i> assumes no liability for monitoring, modifying, removing, or declining to publish User-Generated Content on this Service.</p>
							<p>You acknowledge and accept that the views and opinions expressed by other users on the Site are theirs alone and should not be ascribed to ASU, or MIT. User-Generated Content and Third-Party Content are the sole responsibility of the users and third-parties, and their accuracy and completeness are not endorsed or guaranteed by ASU, or MIT. </p>
							<h2>Prohibited Uses of the Site</h2>
							<p>You may not access or use the Site in any manner that could damage or overburden any ASU or MIT, or any network connected to any ASU or MIT server. You may not use the Site in any manner that would interfere with any other party’s use of the Site.</p>
							<h2>Use of Names</h2>
							<p>You may not use ASU or MIT’s names, trademarks, logos, or insignia, or any version, abbreviation or representation of them, in any advertising, publicity, promotional materials or other public announcement without the prior written consent of MIT’s Technology Licensing Office and/or ASU’s Enterprise Marketing Hub, which consent MIT and/or ASU may withhold in their sole discretion.</p>
							<h2>Registration, Privacy, and Termination of Access</h2>
							<p>Certain areas of the Site may require registration or may otherwise ask you to provide information in order to participate. The decision to provide this information is optional; however if you elect not to provide such information, you may not be able to access certain content, features, or functionalities. When you register, you must provide information to <i>Frankenbook</i> that is accurate, current and complete (excepting the use of a pseudonym). <a href="/privacy">The Site’s Privacy Policy</a> governs the use of the information you report. <i>Frankenbook</i> reserves the right to terminate the registrations and otherwise deny Site access to any person for any reason. The Site will not be liable for any loss or damage arising from your failure to protect your password or account login information.</p>
							<h2>Disclaimer of Warranty / Limitation of Liability</h2>
							<p>Your use of the Site is at your sole risk. To the fullest extent permitted by the law, ASU and MIT disclaim all warranties, express or implied, in connection with the Site and your use thereof. ASU and MIT make no warranties or representations about the accuracy or completeness of the Site’s content (including User-Generated Content and Third-Party Content) or the content of any websites linked to this Site and assume no liability or responsibility for any (1) errors, mistakes, omissions, or inaccuracies in content; (2) personal injury or property damage, of any nature whatsoever, resulting from your access to and use of the Site; (3) unauthorized access to or use of ASU or MIT’s secure servers and/or any and all personal information and/or financial information stored therein; (4) interruption or cessation of transmission to or from the Site; (5) bugs, viruses, Trojan horses, or the like that may be transmitted to or through the Site by any third-party; and/ or (6) content or any loss or damage of any kind incurred as a result of the use of any content posted, emailed, transmitted, or otherwise made available via the Site. You assume all risk as to the quality, function, and performance of the Site, and to all transactions you undertake on the Site, including without limitation submission of any User-Generated Content.</p>
							<p>You agree that ASU and MIT will not be liable to you for any loss or damages, either actual or consequential, arising out of or relating to these terms, or your (or any third-party’s) use or inability to use the Site, or your placement of User-Generated Content on the Site, or your reliance upon information obtained from or through the Site, or your communications with other users of the Site. In particular, ASU and MIT will have no liability for any consequential, indirect, punitive, special or incidental damages, whether foreseeable or unforeseeable, (including, but not limited to, claims for defamation, errors, loss of data, or interruption in availability of data), arising out of or relating to these terms, your use or inability to use a site, your placement of content on the Site, your reliance upon information obtained from or through a Site, or your communications with other users of the Site, whether based in contract, tort, statutory or other law, except only in the case of death or personal injury where and only to the extent that applicable law requires such liability.</p>
							<h2>Indemnification</h2>
							<p>You hereby indemnify, defend, and hold harmless ASU, MIT, and their affiliates, employees, faculty members, fellows, students, members of their governing boards and agents (collectively, the “Indemnified Parties”) from and against any and all liability and costs, including, without limitation, reasonable attorneys’ fees, incurred by the Indemnified Parties in connection with any claim arising out of (1) your posting of User-Generated Content; (2) any breach by you or any user of your account of this TOS or the foregoing representations, warranties and covenants; or (3) your or any user of your account’s violation of applicable law. You shall cooperate as reasonably required in the defense of any such claim. ASU and MIT reserve the right, at their own expense, to assume the exclusive defense and control of any matter subject to indemnification by you.</p>
							<h2>Contacting this Website</h2>
							<p>If you have any questions about this TOS or Privacy Policy, the practices of the Site, or your dealings with this Site, you can contact Pubpub@media.mit.edu. </p>
							<h2>Effective Date of Agreement</h2>
							<p>This TOS is in effect as of January 1, 2018. </p>

						</div>
					</div>
				</div>
			</div>
		);
	}
}

Terms.propTypes = propTypes;
export default withRouter(Terms);
