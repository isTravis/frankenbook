import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@pubpub/editor';
import HighlightMenu from '@pubpub/editor/addons/HighlightMenu';
import Image from '@pubpub/editor/addons/Image';
import DiscussionAddon from 'components/DiscussionAddon/DiscussionAddon';
import { s3Upload, getResizedUrl } from 'utilities';

const essaysContent = require('essaysSourceEditor.json');
require('./essaysContent.scss');

const contextTypes = {
	router: PropTypes.object,
	store: PropTypes.object,
};

class EssaysContent extends Component {
	render() {
		return (
			<div className={'essays'}>
				<Editor
					initialContent={essaysContent}
					isReadOnly={true}
				>
					<Image
						handleFileUpload={s3Upload}
						handleResizeUrl={(url)=> { return getResizedUrl(url, 'fit-in', '800x0'); }}
					/>
					<DiscussionAddon
						routerContext={this.context.router}
						storeContext={this.context.store}
					/>
					<HighlightMenu
						highlights={[]}
						primaryEditorClassName={'book-content'}
						hoverBackgroundColor={'aqua'}
					/>
				</Editor>
			</div>
		);
	}
}

EssaysContent.contextTypes = contextTypes;
export default EssaysContent;
