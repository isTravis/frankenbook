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
		if (!this.state.items.length) {
			this.generateItems();
			// const items = this.generateItems();
			// this.setState({ items: items });
		}
	}

	componentWillReceiveProps(nextProps) {
		// console.log(nextProps.editorState.doc.content);
		// if (!this.toc.length) {
		// 	this.getRoots(nextProps.editorState.toJSON().doc);
		// }
		if (!this.state.items.length) {
			this.generateItems();
			// const items = this.generateItems();
			// this.setState({ items: items });
		}
		// this.topOffsets = this.getTopOffsets(this.toc);
		// console.log(this.topOffsets);
	}

	componentWillUnmount() {
		this.wrapperElem.removeEventListener('scroll', this.scrollEvent);
		document.getElementsByClassName('scroll-bar')[0].removeEventListener('mousedown', this.mouseDownEvent);
	}

	generateItems() {
		const items = [];
		const totalHeight = this.wrapperElem.scrollHeight;

		const headers = document.querySelectorAll('h1,h2');
		for (let index = 0; index < headers.length; index++) {
			const topOffset = headers[index].offsetTop;
			const percentage = (topOffset / totalHeight) * 100;
			items.push({
				tagName: headers[index].tagName,
				content: headers[index].innerText,
				hash: `node${index}`,
				topOffset: percentage,
			});
		}
		this.setState({ items: items });
	}

	scrollEvent() {
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
						<div
							className={`tab ${item.tagName === 'H1' ? 'h1' : 'h2'}`}
							key={item.hash}
							style={{ top: `calc(${item.topOffset}% - 2px)` }}
						>
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