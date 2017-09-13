import React from 'react';
import { storiesOf } from '@storybook/react';
import Discussions from 'components/Discussions/Discussions';


const discussions = [
  {
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
  },
  {
    "link": "#link-104",
    "author": "Braden Allenby",
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
          "content": "This passage is about perceived momentum: the past reconstructed from the viewpoint of the present always appears to have a structure, a momentum, and an obvious path. It is this deep misconception in part that leads to optimism regarding the ability to predict the future and to manipulate the present in such a way as to achieve desired future states. But the challenges of technology and governance in an increasingly complex world mean that such optimism is both hubristic and dysfunctional. It is hubristic because it dramatically overestimates the ability of anyone, technologist or policy maker, to predict future paths of sociotechnological systems, and it is dysfunctional because it leads to becoming lost in a haze of whimsical fantasy rather than to putting effort into the difficult and constantly changing challenge of dealing ethically, responsibly, and rationally with an ever-morphing, fundamentally unpredictable, real world. You can reachback and claim there is a clear stream from your deep past to your present situation, but what you are really doing is building an entirely normative reconstruction, an arbitrary and partial one at best."
        }
      ]
    },
    "anchor": "e4a466",
    "labels": [
      "Ethics"
    ]
  }
]
storiesOf('Discussions', module)
.add('Default', () => (
	<div style={{ margin: '1em' }} className={'story-container'}>
		<style>{`
			.story-container { font-size: 21px; }
			.key.${'Engineering'}, .pt-tag.${'Engineering'} { background-color: ${'#2387aa'}; } 
			.key.${'Ethics'}, .pt-tag.${'Ethics'} { background-color: ${'#14ac88'}; } 
		`}</style>
		<p>
			Blah blah blah here is some text!
			<Discussions
				discussions={discussions}
				parentHash={'e4a466'}
			/>
		</p>
	</div>
));
