import React from 'react';
import { storiesOf } from '@storybook/react';
import UserHeader from 'components/UserHeader/UserHeader';

const wrapperStyle = { margin: '1em', boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.2)' };

const userData = {
	id: '8b7ef2b6-4643-491e-99c6-b6c1cbdb7067',
	slug: 'tyrell-green7638',
	firstName: 'Tyrell',
	lastName: 'Green',
	fullName: 'Tyrell Green',
	initials: 'TG',
	avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/LucasPerdidao/128.jpg',
	bio: 'I had a childhood!',
	location: 'Olsonhaven, Oklahoma',
	website: 'http://david.name',
	facebook: 'Maximillia.Gottlieb',
	twitter: 'Maximillia.Gottlieb',
	github: 'Maximillia.Gottlieb',
	orcid: '0001-2320-0025-1239',
	googleScholar: null,
};

storiesOf('UserHeader', module)
.add('Default', () => (
	<div>
		<div style={wrapperStyle}>
			<UserHeader
				userData={userData}
			/>
		</div>
		<div style={wrapperStyle}>
			<UserHeader
				userData={userData}
				isUser={true}
			/>
		</div>
	</div>
));
