import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from 'components/Avatar/Avatar';
import { Popover, PopoverInteractionKind, Position, Menu, MenuItem, MenuDivider } from '@blueprintjs/core';

require('./header.scss');

const propTypes = {
	userName: PropTypes.string,
	userInitials: PropTypes.string,
	userSlug: PropTypes.string,
	userAvatar: PropTypes.string,

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

	return (
		<nav className={'header'}>
			<div className={'container'}>
				<div className={'row'}>
					<div className={'col-12'}>

						<div className={'headerItems headerItemsLeft'}>
							<Link to={'/'}>
								<img alt={'header logo'} className={'headerLogo'} src={'/headerLogo.png'} />
							</Link>
						</div>

						<div className={'headerItems headerItemsRight'}>

							{/* Search button */}
							<Link to={'/search'} className="pt-button pt-large pt-minimal pt-icon-search" />

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
