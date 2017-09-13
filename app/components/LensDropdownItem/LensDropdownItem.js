import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

require('./lensDropdownItem.scss');

const propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired,
	isActive: PropTypes.bool,
};

const defaultProps = {
	isActive: false,
};

const LensDropdownItem = function(props) {
	const colorStyle = { color: props.isActive ? props.color : 'inherit' };
	return (
		<Link to={props.to} replace className={`pt-menu-item lens-dropdown-item ${props.isActive ? 'active' : ''}`}>
			<span className={`pt-icon-standard pt-icon-${props.icon}`} style={colorStyle} />
			<div className={'details'}>
				<div className={'title'} style={colorStyle}>{props.title}</div>
				<div className={'description'}>{props.description}</div>
			</div>
		</Link>
	);
};

LensDropdownItem.defaultProps = defaultProps;
LensDropdownItem.propTypes = propTypes;
export default LensDropdownItem;
