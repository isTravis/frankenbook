import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from 'components/Avatar/Avatar';
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

	const getLensQuery = function(lens) {
		const queryObject = queryString.parse(props.location.search);
		const lenses = queryObject.lenses && queryObject.lenses.split('+');

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
								content={
									<Menu>
										{props.lensData.map((lens)=> {
											return (
												<li key={lens.slug}>
													<Link className={'pt-menu-item'} replace to={`/?${getLensQuery(lens.slug)}`}>
														{lens.title}
													</Link>
												</li>
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
									Active Lenses:
									<span className="pt-icon-standard pt-icon-caret-down pt-align-right" />
								</button>
							</Popover>
						</div>

						<div className={'headerItems headerItemsRight'}>

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
