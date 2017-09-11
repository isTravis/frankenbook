import React, { Component } from 'react';
import PropTypes from 'prop-types';

require('./scrollBar.scss');

const propTypes = {
	alwaysShow: PropTypes.bool,
	toc: PropTypes.array.isRequired,
	documentClassName: PropTypes.string.isRequired

};

const defaultProps = {
	alwaysShow: true,
};

class ScrollBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			percentage: 0,
		};

		this.wrapperElem = document.getElementsByClassName(this.props.documentClassName)[0];
		this.getTopOffsets = this.getTopOffsets.bind(this);
		this.scrollEvent = this.scrollEvent.bind(this);
		this.mouseDownEvent = this.mouseDownEvent.bind(this);
		this.mouseMoveEvent = this.mouseMoveEvent.bind(this);
		this.mouseUpEvent = this.mouseUpEvent.bind(this);

		this.topOffsets = this.getTopOffsets(this.props.toc);
	}

	componentDidMount() {
		// const elem = document.getElementsByClassName(this.props.documentClassName)[0];
		this.wrapperElem.addEventListener('scroll', this.scrollEvent);
		document.getElementsByClassName('scroll-bar')[0].addEventListener('mousedown', this.mouseDownEvent);
	}

	componentWillUnmount() {
		// const elem = document.getElementsByClassName(this.props.documentClassName)[0];
		this.wrapperElem.removeEventListener('scroll', this.scrollEvent);
		document.getElementsByClassName('scroll-bar')[0].removeEventListener('mousedown', this.mouseDownEvent);
	}

	getTopOffsets(items) {
		const output = {};
		items.forEach((item)=> {
			const elem = document.getElementById(item.hash);
			if (!elem) { return 0; }
			const top = elem.offsetTop;
			const total = this.wrapperElem.scrollHeight;
			const percentage = top / total * 100;
			output[item.hash] = `calc(${percentage}% - 6px)`;
		});
		return output;
		
	}

	scrollEvent(evt) {
		// console.log('scroll');
		const percentage = this.wrapperElem.scrollTop/(this.wrapperElem.scrollHeight) * 100;
		// console.log(percentage);
		this.setState({ percentage: percentage });
	}

	mouseDownEvent(evt) {
		const topPadding = 56;
		// const elem = document.getElementsByClassName(this.props.documentClassName)[0];
		const clientClick = evt.clientY;
		const clientHeight = document.documentElement.clientHeight;
		const percentage = (clientClick - topPadding) / (clientHeight - topPadding);
		this.wrapperElem.scroll(0, percentage * this.wrapperElem.scrollHeight);
		document.getElementsByClassName('scroll-bar')[0].addEventListener('mousemove', this.mouseMoveEvent);
		document.getElementsByClassName('scroll-bar')[0].addEventListener('mouseup', this.mouseUpEvent);
	}

	mouseMoveEvent(evt) {
		const topPadding = 56;
		// const elem = document.getElementsByClassName(this.props.documentClassName)[0];
		const clientClick = evt.clientY;
		const clientHeight = document.documentElement.clientHeight;
		const percentage = (clientClick - topPadding) / (clientHeight - topPadding);
		this.wrapperElem.scroll(0, percentage * this.wrapperElem.scrollHeight);
	}

	mouseUpEvent(evt) {
		document.getElementsByClassName('scroll-bar')[0].removeEventListener('mousemove', this.mouseMoveEvent);
		document.getElementsByClassName('scroll-bar')[0].removeEventListener('mouseup', this.mouseUpEvent);
	}
	
	render() {
		return (
			<div className={'scroll-bar'}>
				<div className={'bar'} style={{ top: `${this.state.percentage}%`}}/>
				{this.props.toc.map((item)=> {
					return (
						<div className={'tab'} key={item.hash} style={{ top: this.topOffsets[item.hash] }}>
							{item.content}
						</div>
					);
				})}
				
			</div>
		);
	}
};

ScrollBar.defaultProps = defaultProps;
ScrollBar.propTypes = propTypes;
export default ScrollBar;
