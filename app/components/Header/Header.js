import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from 'components/Avatar/Avatar';
import LensDropdownItem from 'components/LensDropdownItem/LensDropdownItem';
import { Popover, PopoverInteractionKind, Position, Menu, MenuItem, MenuDivider } from '@blueprintjs/core';
import queryString from 'query-string';

require('./header.scss');

const propTypes = {
	userName: PropTypes.string,
	userInitials: PropTypes.string,
	userSlug: PropTypes.string,
	userAvatar: PropTypes.string,
	lensData: PropTypes.array.isRequired,
	location: PropTypes.object.isRequired,
	logoutHandler: PropTypes.func.isRequired,
};

const defaultProps = {
	userName: undefined,
	userInitials: undefined,
	userSlug: undefined,
	userAvatar: undefined,
};

const Header = function(props) {
	const loggedIn = !!props.userSlug;
	const defaults = ['engineering', 'ethics'];
	const lensDataObject = props.lensData.reduce((prev, curr)=> {
		prev[curr.slug] = curr;
		return prev;
	}, {});
	const getLensQuery = function(lens) {
		const queryObject = queryString.parse(props.location.search);
		const lenses = queryObject.lenses && queryObject.lenses.replace(/\s/gi, '+').split('+');
		console.log(queryObject, lenses);

		// No Lense query
		if (!lenses) {
			const nextLenses = defaults.filter((item)=> { return item !== lens; });
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
	const activeLenses = queryObject.lenses && queryObject.lenses.replace(/\s/gi, '+').split('+') || defaults;
	return (
		<nav className={'header'}>
			<div className={'container'}>
				<div className={'row'}>
					<div className={'col-12'}>

						<div className={'headerItems headerItemsLeft'}>
							<Link to={'/'}>
								<img alt={'header logo'} className={'headerLogo'} src={'/headerLogo.png'} />
							</Link>

							<Popover
								isOpen={true}
								content={
									<Menu>
										{props.lensData.sort((foo, bar)=> {
											if (foo.slug > bar.slug) { return 1; }
											if (foo.slug < bar.slug) { return -1; }
											return 0;
										}).map((lens)=> {
											return (
												<LensDropdownItem
													key={lens.slug}
													to={`/?${getLensQuery(lens.slug)}`}
													title={lens.title}
													description={lens.description}
													color={lens.color}
													icon={lens.icon}
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
											Active Lenses:
											{activeLenses.sort((foo, bar)=> {
												if (foo > bar) { return 1; }
												if (foo < bar) { return -1; }
												return 0;
											}).map((item)=> {
												const data = lensDataObject[item];
												// return <span>{lensDataObject[item]}</span>;
												return <span className={`pt-icon-standard pt-icon-${data.icon}`} style={{ color: data.color, paddingLeft: '0.5em' }} />;
											})}
										</span>
									}
									{activeLenses[0] === 'none' &&
										<span>No Active Lenses</span>
									}
									<span className="pt-icon-standard pt-icon-caret-down pt-align-right" />
								</button>
							</Popover>
						</div>

						<div className={'headerItems headerItemsRight'}>
							<a href={'https://docs.google.com'} target={'_blank'} className="pt-button pt-large pt-minimal">Dev Notes</a>

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
											<MenuDivider />
											<li>
												<Link to={'/pub-create'} className="pt-menu-item pt-popover-dismiss">
													Create New Pub
												</Link>
											</li>
											<li>
												<Link to={`/user/${props.userSlug}/pubs`} className="pt-menu-item pt-popover-dismiss">
													Your Pubs
												</Link>
											</li>
											<MenuDivider />
											<MenuItem text={'Logout'} onClick={props.logoutHandler} />
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
								<Link to={'/login'} className="pt-button pt-large pt-minimal">Login or Signup</Link>
							}
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

Header.defaultProps = defaultProps;
Header.propTypes = propTypes;
export default Header;
