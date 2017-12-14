import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from 'components/Avatar/Avatar';
import LensDropdownItem from 'components/LensDropdownItem/LensDropdownItem';
import { Popover, PopoverInteractionKind, Position, Menu, MenuItem } from '@blueprintjs/core';
import queryString from 'query-string';
import { defaultLenses } from 'utilities';

require('./header.scss');

const propTypes = {
	userName: PropTypes.string,
	userInitials: PropTypes.string,
	userSlug: PropTypes.string,
	userAvatar: PropTypes.string,
	lensesData: PropTypes.array,
	location: PropTypes.object.isRequired,
	appLoading: PropTypes.bool.isRequired,
	onLogout: PropTypes.func.isRequired,
};

const defaultProps = {
	userName: undefined,
	userInitials: undefined,
	userSlug: undefined,
	userAvatar: undefined,
	lensesData: undefined,
};

const Header = function(props) {
	const loggedIn = !!props.userSlug;
	const lensDataObject = props.lensesData && props.lensesData.reduce((prev, curr)=> {
		prev[curr.slug] = curr;
		return prev;
	}, {});
	const getLensQuery = function(lens) {
		const queryObject = queryString.parse(props.location.search);
		const lenses = queryObject.lenses && queryObject.lenses.replace(/\s/gi, '+').split('+');

		// No Lense query
		if (!lenses) {
			const nextLenses = defaultLenses.indexOf(lens) > -1
				? defaultLenses.filter((item)=> { return item !== lens; })
				: [...defaultLenses, lens];
			return queryString.stringify({ lenses: nextLenses.join('+') }, { encode: false });
		}

		// Empty lenses query - i.e. no lenses are being shown
		if (lenses[0] === 'none') {
			const nextLenses = [lens];
			return queryString.stringify({ lenses: nextLenses.join('+') }, { encode: false });
		}

		// Lens is not in the array - add it in
		if (lenses.indexOf(lens) === -1) {
			lenses.push(lens);
			const nextLenses = lenses;
			return queryString.stringify({ lenses: nextLenses.join('+') }, { encode: false });
		}

		// Lens is in the array - remove it
		const nextLenses = lenses.filter((item)=> { return item !== lens; });
		if (!nextLenses.length) {
			return queryString.stringify({ lenses: 'none' });
		}
		return queryString.stringify({ lenses: nextLenses.join('+') }, { encode: false });
	};

	const queryObject = queryString.parse(props.location.search);
	const activeLenses = queryObject.lenses && queryObject.lenses.replace(/\s/gi, '+').split('+') || defaultLenses;
	return (
		<nav className={'header'}>
			<div className={'container'}>
				<div className={'row'}>
					<div className={'col-12'}>

						<div className={'headerItems headerItemsLeft'}>
							<Link to={'/'}>
								<img alt={'header logo'} className={'headerLogo'} src={'/headerLogo.png'} />
							</Link>

							{lensDataObject && props.location.pathname === '/' &&
								<Popover
									content={
										<Menu>
											<Link to={'/about'} className={'pt-menu-item helper'}>
												Themes group annotations by topic.<br/>Click here to learn more.
											</Link>
											{props.lensesData.sort((foo, bar)=> {
												if (foo.slug > bar.slug) { return 1; }
												if (foo.slug < bar.slug) { return -1; }
												return 0;
											}).map((lens)=> {
												return (
													<LensDropdownItem
														key={lens.slug}
														to={`/?${getLensQuery(lens.slug)}`}
														lensObject={lens}
														isActive={activeLenses.indexOf(lens.slug) > -1}
													/>
												);
											})}
										</Menu>
									}
									interactionKind={PopoverInteractionKind.CLICK}
									position={Position.BOTTOM_LEFT}
									popoverClassName={'pt-minimal'}
									transitionDuration={-1}
									inheritDarkTheme={false}
								>
									<button className="pt-button lens-dropdown">
										{activeLenses[0] !== 'none' &&
											<span>
												{activeLenses.length} Active Theme{activeLenses.length === 1 ? '' : 's'}
											</span>
										}
										{activeLenses[0] === 'none' &&
											<span>No Active Themes</span>
										}
										<span className="pt-icon-standard pt-icon-caret-down pt-align-right" />
									</button>
								</Popover>
							}
						</div>

						{!props.appLoading &&
							<div className={'headerItems headerItemsRight'}>
								<Link to={'/essays'} className="pt-button pt-large pt-minimal">Essays</Link>
								<Link to={'/media'} className="pt-button pt-large pt-minimal">Media</Link>
								<Link to={'/about'} className="pt-button pt-large pt-minimal">About</Link>
								{/* <a href={'https://docs.google.com/document/d/14iyybF3AOg7uNFjI0PqXfHejBq3pKL_niVGARKQdGR0/edit?usp=sharing'} target={'_blank'} className="pt-button pt-large pt-minimal">Dev Notes</a> */}

								{/* User avatar and menu */}
								{loggedIn &&
									<Popover
										content={
											<Menu>
												<li>
													<Link to={`/user/${props.userSlug}`} className="pt-menu-item pt-popover-dismiss">
														<div>{props.userName}</div>
														<div className={'subtext'}>View Profile</div>
													</Link>
												</li>
												<MenuItem text={'Logout'} onClick={props.onLogout} />
											</Menu>
										}
										interactionKind={PopoverInteractionKind.CLICK}
										position={Position.BOTTOM_RIGHT}
										transitionDuration={-1}
										inheritDarkTheme={false}
									>
										<button className="pt-button pt-large pt-minimal avatar-button">
											<Avatar
												userInitials={props.userInitials}
												userAvatar={props.userAvatar}
												width={30}
											/>
										</button>
									</Popover>
								}

								{/* Login or Signup button */}
								{!loggedIn &&
									<Link to={'/login'} className="pt-button pt-large pt-minimal">Login</Link>
								}
							</div>
						}
					</div>
				</div>
			</div>
		</nav>
	);
};

Header.defaultProps = defaultProps;
Header.propTypes = propTypes;
export default Header;
