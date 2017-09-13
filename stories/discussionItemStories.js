import React from 'react';
import { storiesOf } from '@storybook/react';
import DiscussionItem from 'components/DiscussionItem/DiscussionItem';


const discussion = {
  "link": "#link-103",
  "author": "Mary Margaret Fonow",
  "content": {
    "type": "Element",
    "tagName": "div",
    "attributes": {
      "className": [
        "footnote-content"
      ]
    },
    "children": [
      {
        "type": "Text",
        "content": "The setting for the story is Geneva, Switzerland, one of the oldest major capitals of Europe, and Victor is from one of its noblest families. He uses his scientific training to create a new life but then fails to take responsibility for loving and caring for that life. He is shocked and disgusted when his creation doesn’t turn out as he planned. Yet he is also mostly unaware that his failure to take care of his creation in turn has created the creature he fears and rejects. Mary and her family traveled in more liberal and even radical circles, and she abhorred and flaunted the conventional mores of high society. In Frankenstein, is she calling attention to the propensity of those at the top to ignore the consequences of their actions? Social status cannot fully protect individuals from unintended consequences. Scientists and engineers who are often at the highest ranks of the academy need to be more mindful of the unintended consequences of their discoveries."
      }
    ]
  },
  "anchor": "e4a466",
  "labels": [
    "Engineering",
    "Ethics"
  ]
};

storiesOf('DiscussionItem', module)
.add('Default', () => (
	<div style={{ margin: '1em' }} className={'story-container pt-card pt-elevation-2'}>
		<style>{`
			.story-container { font-size: 21px; }
			.key.${'Engineering'}, .pt-tag.${'Engineering'} { background-color: ${'#2387aa'}; } 
			.key.${'Ethics'}, .pt-tag.${'Ethics'} { background-color: ${'#14ac88'}; } 
		`}</style>
		<DiscussionItem discussion={discussion} />
	</div>
));
