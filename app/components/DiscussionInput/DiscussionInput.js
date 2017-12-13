import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';
import { Editor } from '@pubpub/editor';
import FormattingMenu from '@pubpub/editor/addons/FormattingMenu';
import HighlightQuote from '@pubpub/editor/addons/HighlightQuote';
import InsertMenu from '@pubpub/editor/addons/InsertMenu';
import Image from '@pubpub/editor/addons/Image';
import Video from '@pubpub/editor/addons/Video';
import Iframe from '@pubpub/editor/addons/Iframe';
import { s3Upload, getResizedUrl } from 'utilities';

require('./discussionInput.scss');

const propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	isReply: PropTypes.bool,
	initialContent: PropTypes.object,
	submitIsLoading: PropTypes.bool,
	getHighlightContent: PropTypes.func,
	userId: PropTypes.string,
};

const defaultProps = {
	isReply: false,
	initialContent: undefined,
	submitIsLoading: false,
	getHighlightContent: undefined,
	userId: undefined,
};

class DiscussionInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			body: '',
			submitDisabled: true,
			key: new Date().getTime(),
		};
		this.onBodyChange = this.onBodyChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.editorRef = undefined;
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.submitIsLoading && !nextProps.submitIsLoading) {
			this.setState({
				key: new Date().getTime()
			});
		}
	}

	onBodyChange(val) {
		this.setState({
			body: val,
			submitDisabled: !this.props.userId || !this.editorRef.view.state.doc.textContent,
		});
	}

	onSubmit(evt) {
		evt.preventDefault();
		this.props.handleSubmit({
			content: this.state.body,
			text: this.editorRef.view.state.doc.textContent,
		});
	}

	render() {
		const saveText = this.props.isReply ? 'Save Reply' : 'Save Annotation';
		return (
			<div className={'discussion-input'}>
				<div className={'input-text'} tabIndex={-1} role={'textbox'}>
					<Editor
						key={this.state.key}
						ref={(ref)=> { this.editorRef = ref; }}
						placeholder={this.props.isReply ? 'Reply...' : 'Begin your annotation...'}
						onChange={this.onBodyChange}
						initialContent={this.props.initialContent}
					>
						<FormattingMenu include={['link', 'bold', 'italic']} />
						<HighlightQuote
							getHighlightContent={this.props.getHighlightContent}
						/>
						<InsertMenu />
						<Image
							handleFileUpload={s3Upload}
							handleResizeUrl={(url)=> { return getResizedUrl(url, 'fit-in', '800x0'); }}
						/>
						<Video
							handleFileUpload={s3Upload}
						/>
						<Iframe />
					</Editor>
				</div>
				<div className={'buttons'}>
					<div className={'buttons-left'} />
					<div className={'buttons-right'}>
						<Button
							name={'submit'}
							type={'submit'}
							className={'pt-button pt-intent-primary pt-small'}
							onClick={this.onSubmit}
							text={this.props.userId ? saveText : 'Login to Submit'}
							disabled={this.state.submitDisabled}
							loading={this.props.submitIsLoading}
						/>
					</div>
				</div>
			</div>
		);
	}
}

DiscussionInput.propTypes = propTypes;
DiscussionInput.defaultProps = defaultProps;
export default DiscussionInput;
