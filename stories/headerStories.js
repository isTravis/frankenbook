import React from 'react';
import { storiesOf } from '@storybook/react';
import Header from 'components/Header/Header';

const wrapperStyle = { margin: '1em', boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.25)' };
const titleStyle = { margin: '1em 1em -0.5em' };

const headerBars = function() {
	const data = {
		userName: 'Maggie Farnkrux',
		userInitials: 'MF',
		userSlug: 'maggiefarn',
		userAvatar: '/dev/maggie.jpg',
		logoutHandler: ()=> {},
	};
	return (
		<div>
			<h4 style={titleStyle}>Logged Out</h4>
			<div style={wrapperStyle}>
				<Header
					smallHeaderLogo={data.smallHeaderLogo}
					logoutHandler={data.logoutHandler}
				/>
			</div>

			<h4 style={titleStyle}>Logged In · User</h4>
			<div style={wrapperStyle}>
				<Header
					userName={data.userName}
					userInitials={data.userInitials}
					userSlug={data.userSlug}
					logoutHandler={data.logoutHandler}
				/>
			</div>
		</div>
	);
};

storiesOf('Header', module)
.add('Default', () => (
	<div>
		{headerBars()}
	</div>
));
