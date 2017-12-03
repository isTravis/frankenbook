import React, { Component } from 'react';
import PropTypes from 'prop-types';

require('../ScrollBar/scrollBar.scss');

const propTypes = {
	// alwaysShow: PropTypes.bool,
	// toc: PropTypes.array.isRequired,
	documentClassName: PropTypes.string.isRequired,
	view: PropTypes.object,
	editorState: PropTypes.object,
};

const defaultProps = {
	alwaysShow: true,
	view: undefined,
	editorState: undefined,
};

class ScrollBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			percentage: 0,
			currentVal: undefined,
			docRendered: false,
			items: [],
		};

		this.wrapperElem = document.getElementsByClassName(this.props.documentClassName)[0];
		// this.getRoots = this.getRoots.bind(this);
		this.generateItems = this.generateItems.bind(this);
		this.scrollEvent = this.scrollEvent.bind(this);
		this.mouseDownEvent = this.mouseDownEvent.bind(this);
		this.mouseMoveEvent = this.mouseMoveEvent.bind(this);
		this.mouseUpEvent = this.mouseUpEvent.bind(this);

		// this.toc = [];
		// this.topOffsets = {};
		// this.topOffsets = this.getTopOffsets(this.props.toc);
	}

	componentDidMount() {
		this.wrapperElem.addEventListener('scroll', this.scrollEvent);
		document.getElementsByClassName('scroll-bar')[0].addEventListener('mousedown', this.mouseDownEvent);
		// this.topOffsets = this.getTopOffsets(this.props.toc);
		const items = this.generateItems(this.props);
		this.setState({ items: items });
	}

	componentWillReceiveProps(nextProps) {
		// console.log(nextProps.editorState.doc.content);
		// if (!this.toc.length) {
		// 	this.getRoots(nextProps.editorState.toJSON().doc);
		// }
		const items = this.generateItems(nextProps);
		this.setState({ items: items });
		// this.topOffsets = this.getTopOffsets(this.toc);
		// console.log(this.topOffsets);
	}

	componentWillUnmount() {
		this.wrapperElem.removeEventListener('scroll', this.scrollEvent);
		document.getElementsByClassName('scroll-bar')[0].removeEventListener('mousedown', this.mouseDownEvent);
	}

	// getRoots(content) {
	// 	if (content.type === 'heading' && content.attrs.level < 3) {
	// 		this.toc.push({
	// 			tagName: `h${content.attrs.level}`,
	// 			content: content.content[0].text,
	// 			hash: content.attrs.id
	// 		});
	// 	}
	// 	if (content.content) {
	// 		content.content.map((child)=> {
	// 			return this.getRoots(child);
	// 		});
	// 	}
	// }
	generateItems(props) {
		console.log('Calling gen items');
		const doc = props.editorState.doc;
		const items = [];
		const wrapperOffset = this.wrapperElem.scrollTop + this.wrapperElem.offsetTop;
		const totalHeight = this.wrapperElem.scrollHeight;

		for (let index = 0; index < doc.nodeSize - 1; index++) {
			const currNode = doc.nodeAt(index);

			if (currNode && currNode.type.name === 'heading' && currNode.attrs.level < 3) {
				const topOffset = props.view.coordsAtPos(index).top + wrapperOffset;
				const percentage = (topOffset / totalHeight) * 100;
				items.push({
					tagName: `h${currNode.attrs.level}`,
					content: currNode.content.content[0].text,
					hash: `node${index}`,
					topOffset: percentage,
				});
			}
		}
		
		return items;
	}

	scrollEvent() {
		console.log('Calling scroll');
		const percentage = (this.wrapperElem.scrollTop / this.wrapperElem.scrollHeight) * 100;
		const percentages = this.state.items.sort((foo, bar)=> {
			if (foo.topOffset > bar.topOffset) { return 1; }
			if (foo.topOffset < bar.topOffset) { return -1; }
			return 0;
		});
		const active = percentages.reduce((prev, curr)=> {
			if (curr.topOffset < percentage) { return curr; }
			return prev;
		}, percentages[0]);

		this.setState({ percentage: percentage, currentVal: active.content });
	}

	mouseDownEvent(evt) {
		const topPadding = 56;
		const clientClick = evt.clientY;
		const clientHeight = document.documentElement.clientHeight;
		const percentage = (clientClick - topPadding) / (clientHeight - topPadding);
		this.wrapperElem.scrollTop = percentage * this.wrapperElem.scrollHeight;
		document.getElementsByClassName('scroll-bar')[0].addEventListener('mousemove', this.mouseMoveEvent);
		document.getElementsByClassName('scroll-bar')[0].addEventListener('mouseup', this.mouseUpEvent);
	}

	mouseMoveEvent(evt) {
		const topPadding = 56;
		const clientClick = evt.clientY;
		const clientHeight = document.documentElement.clientHeight;
		const percentage = (clientClick - topPadding) / (clientHeight - topPadding);
		this.wrapperElem.scrollTop = percentage * this.wrapperElem.scrollHeight;
	}

	mouseUpEvent() {
		document.getElementsByClassName('scroll-bar')[0].removeEventListener('mousemove', this.mouseMoveEvent);
		document.getElementsByClassName('scroll-bar')[0].removeEventListener('mouseup', this.mouseUpEvent);
	}

	render() {
		return (
			<div className={'scroll-bar'}>
				<div className={'position'} style={{ top: `${this.state.percentage}%` }} />
				<div className={'bar-wrapper'} style={{ top: `${this.state.percentage}%` }}>
					<div className={'bar'} />
					<div className={'current'}>{this.state.currentVal}</div>
				</div>

				{this.state.items.map((item)=> {
					return (
						/*<div className={`tab ${item.tagName === 'h1' ? 'h1' : 'h2'}`} key={item.hash} style={{ top: `calc(${this.topOffsets[item.hash]}% - 2px)` }}>*/
						<div className={`tab ${item.tagName === 'h1' ? 'h1' : 'h2'}`} key={item.hash} style={{ top: `calc(${item.topOffset}% - 2px)` }}>
							{item.content}
						</div>
					);
				})}

			</div>
		);
	}
}

ScrollBar.defaultProps = defaultProps;
ScrollBar.propTypes = propTypes;
export default ScrollBar;
