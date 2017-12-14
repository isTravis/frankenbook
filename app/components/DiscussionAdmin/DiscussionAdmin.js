import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';
import { Checkbox, Popover, PopoverInteractionKind, Position, Menu, MenuItem, Button } from '@blueprintjs/core';
import DiscussionItem from 'components/DiscussionItem/DiscussionItem';
import LensDropdownItem from 'components/LensDropdownItem/LensDropdownItem';
import { Editor } from '@pubpub/editor';
import HighlightQuote from '@pubpub/editor/addons/HighlightQuote';
import Image from '@pubpub/editor/addons/Image';
import Video from '@pubpub/editor/addons/Video';
import Iframe from '@pubpub/editor/addons/Iframe';
import { getResizedUrl } from 'utilities';

require('./discussionAdmin.scss');

const propTypes = {
	discussion: PropTypes.object.isRequired,
	labels: PropTypes.array.isRequired,
	onAddLabel: PropTypes.func.isRequired,
	onRemoveLabel: PropTypes.func.isRequired,
	onUpdateDiscussion: PropTypes.func.isRequired,
	putDiscussionIsLoading: PropTypes.bool.isRequired,
};

class DiscussionAdmin extends Component {
	constructor(props) {
		super(props)
		const itemLabels = props.discussion.labels || [];
		this.state = {
			itemLabelIds: itemLabels.map((label)=> { return label.id; })
		};
		this.toggleFlag = this.toggleFlag.bind(this);
		this.toggleEndorse = this.toggleEndorse.bind(this);
		this.addLabel = this.addLabel.bind(this);
		this.removeLabel = this.removeLabel.bind(this);
	}

	toggleFlag() {
		const updatedObject = {
			discussionId: this.props.discussion.id,
			parentId: this.props.discussion.parentId,
			flagged: !this.props.discussion.flagged,
		};
		this.props.onUpdateDiscussion(updatedObject);
	}

	toggleEndorse() {
		const updatedObject = {
			discussionId: this.props.discussion.id,
			parentId: this.props.discussion.parentId,
			endorsed: !this.props.discussion.endorsed,
		};
		this.props.onUpdateDiscussion(updatedObject);
	}
	addLabel(labelId) {
		this.setState({
			itemLabelIds: [
				...this.state.itemLabelIds,
				labelId
			]
		});
		this.props.onAddLabel({
			discussionId: this.props.discussion.id,
			labelId: labelId,
		});
	}
	removeLabel(labelId) {
		this.setState({
			itemLabelIds: this.state.itemLabelIds.filter((currId)=> {
				return currId !== labelId;
			}),
		});
		this.props.onRemoveLabel({
			discussionId: this.props.discussion.id,
			labelId: labelId,
		});
	}

	render() {
		const item = this.props.discussion || {};
		return (
			<div className={'discussion-admin-wrapper'}>
				{item.parentId &&
					<h6>Reply Item</h6>
				}
				<DiscussionItem
					discussion={item}
					saveDiscussionLoading={''}
					rightButtons={
						<div>							
							<Button
								iconName={'flag'}
								className={`pt-button pt-small ${item.flagged ? 'pt-intent-danger' : ''}`}
								onClick={this.toggleFlag}
								text={`Flag${item.flagged ? 'ged' : ''}`}
								loading={this.props.putDiscussionIsLoading}
							/>
							{!item.parentId &&
								<Button
									className={'pt-button pt-small'}
									onClick={this.toggleEndorse}
									text={`Endorse${item.endorsed ? 'd' : ''}`}
									loading={this.props.putDiscussionIsLoading}
								/>
							}
							{!item.parentId &&
								<Popover
									content={
										<Menu className={'admin-labels-menu'}>
											{this.props.labels.sort((foo, bar)=> {
												if (foo.slug > bar.slug) { return 1; }
												if (foo.slug < bar.slug) { return -1; }
												return 0;
											}).map((lens)=> {
												const isChecked = this.state.itemLabelIds.indexOf(lens.id) > -1;
												const isDisabled = this.state.itemLabelIds.length < 2 && isChecked;
												const addOrRemoveFunc = isChecked
													? this.removeLabel.bind(this, lens.id)
													: this.addLabel.bind(this, lens.id);
												const clickFunc = isDisabled
													? ()=>{}
													: addOrRemoveFunc;
												return (
													<div
														key={`${item.id}-${lens.id}`}
														className={`pt-menu-item pt-icon-${lens.icon} ${isDisabled ? 'pt-disabled' : ''}`}
														onClick={this.toggleFlag}
														style={{ color: lens.color }}
														onClick={clickFunc}
													>
														<span className={'admin-lens-title'}>{lens.title}</span>
														<Checkbox checked={isChecked} onChange={()=>{}} disabled={isDisabled}/>
													</div>
												);
											})}
										</Menu>
									}
									interactionKind={PopoverInteractionKind.CLICK}
									position={Position.BOTTOM_RIGHT}
									popoverClassName={'pt-minimal'}
									transitionDuration={-1}
									inheritDarkTheme={false}
								>
									<button className={'pt-button pt-small'}>
										Themes
										<span className="pt-icon-standard pt-icon-caret-down pt-align-right" />
									</button>	
								</Popover>
								
							}
						</div>
						
					}
				/>
			</div>
		);
	}
}

DiscussionAdmin.propTypes = propTypes;
export default DiscussionAdmin;
