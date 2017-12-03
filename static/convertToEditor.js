/* eslint-disable no-param-reassign */
/* eslint-disable no-console */

const fs = require('fs');
const documentJSON = require('./bookSource.json');
const annotationsJSON = require('./sourceAnnotations.json');

const convertNode = (node, isAnnotation)=> {
	if (node.tagName === 'h1') {
		return {
			type: 'heading',
			attrs: { level: 1 },
			content: [...node.children.map((item)=> { return convertNode(item); })]
		};
	}
	if (node.tagName === 'h2') {
		return {
			type: 'heading',
			attrs: { level: 2 },
			content: [...node.children.map((item)=> { return convertNode(item); })]
		};
	}
	if (node.tagName === 'h3') {
		return {
			type: 'heading',
			attrs: { level: 3 },
			content: [...node.children.map((item)=> { return convertNode(item); })]
		};
	}
	if (node.tagName === 'h4') {
		return {
			type: 'heading',
			attrs: { level: 4 },
			content: [...node.children.map((item)=> { return convertNode(item); })]
		};
	}
	if (node.tagName === 'p') {
		const content = [
			{
				type: 'paragraph',
				content: [
					...node.children.map((item)=> { return convertNode(item, isAnnotation); })
				]
			},
		];
		if (!isAnnotation) {
			content[0].content.push({
				type: 'discussion',
				attrs: { parentHash: node.hash }
			});
		}
		return content;
	}
	if (node.tagName === 'sup') {
		// console.log(JSON.stringify(node, null, 2));
		return {
			type: 'text',
			text: node.children[0].children[0].children[0].content,
			attrs: { id: node.children[0].attributes.id },
			marks: [
				{ type: 'sup' },
				{ type: 'link', attrs: { href: node.children[0].children[0].attributes.href, title: undefined } },
			]
		};
	}
	if (node.tagName === 'blockquote') {
		return [
			{
				type: 'blockquote',
				content: [
					...node.children.map((item)=> { return convertNode(item); }),
				]
			},
		];
	}
	if (node.tagName === 'i') {
		return {
			type: 'text',
			text: node.children[0].content,
			marks: [
				{ type: 'em' }
			]
		};
	}
	if (node.tagName === 'img') {
		return {
			type: 'image',
			attrs: {
				url: node.attributes.src,
				align: 'full',
			},
		};
	}
	if (node.tagName === 'span') {
		return {
			type: 'text',
			text: node.children[0].content,
		};
	}
	if (node.tagName === 'div') {
		return {
			type: 'doc',
			attrs: { meta: {} },
			content: node.children.map((item)=> {
				return convertNode(item, true);
			}).reduce((prev, curr)=> {
				if (Array.isArray(curr)) { return prev.concat(curr); }
				prev.push(curr);
				return prev;
			}, [])
		};
	}
	if (!node.tagName) {
		return { type: 'text', text: node.content };
	}
	console.log('Didnt catch this: ', node);
	return null;
};

const editorJSON = {
	type: 'doc',
	attrs: { meta: {} },
	content: documentJSON.children.map((item)=> {
		return convertNode(item);
	}).reduce((prev, curr)=> {
		if (Array.isArray(curr)) { return prev.concat(curr); }
		prev.push(curr);
		return prev;
	}, [])
};

fs.writeFile('static/bookSourceEditor.json', JSON.stringify(editorJSON, null, 2), 'utf8', ()=> {
	console.log('Finished Processing Book');
});

const convertedAnnotations = annotationsJSON.map((item)=> {
	const output = Object.assign({}, item);
	// output.content = {
	// 	type: 'doc',
	// 	attrs: { meta: {} },
	// 	content: convertNode(item.content, true)
	// };
	output.content = convertNode(item.content, true);
	return output;
});

fs.writeFile('static/sourceAnnotationsEditor.json', JSON.stringify(convertedAnnotations, null, 2), 'utf8', ()=> {
	console.log('Finished Processing Annotations');
});

