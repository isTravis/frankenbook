import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

require('./lensDropdownItem.scss');

const propTypes = {
	to: PropTypes.string.isRequired,
	lensObject: PropTypes.object.isRequired,
	isActive: PropTypes.bool,
};

const defaultProps = {
	isActive: false,
};

const LensDropdownItem = function(props) {
	const lens = props.lensObject;
	const colorStyle = { color: props.isActive ? lens.color : 'inherit' };

	return (
		<Link to={props.to} replace className={`pt-menu-item lens-dropdown-item ${props.isActive ? 'active' : ''}`}>
			<span className={`pt-icon-standard pt-icon-${lens.icon}`} style={colorStyle} />
			<div className={'details'}>
				<div className={'title'} style={colorStyle}>{lens.title} · {lens.discussionsCount}</div>
				{/*<div className={'description'}>{lens.description}</div>*/}
			</div>
		</Link>
	);
};

LensDropdownItem.defaultProps = defaultProps;
LensDropdownItem.propTypes = propTypes;
export default LensDropdownItem;
