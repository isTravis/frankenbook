/* eslint-disable no-param-reassign */
/* eslint-disable no-console */

const fs = require('fs');
const himalaya = require('himalaya');
const hash = require('object-hash');

const html = fs.readFileSync('static/source.html', { encoding: 'utf8' });
const documentJSON = require('./source.json');


// Get link from footnote - if it exists
// Check for sup that has associated link href (from source.json)
// Get parent p of that sup
// Store annotation content, along with anchorHash


const footnotes = [];
const footnotesWithLink = [];

function checkForFootnotes(nodes) {
	nodes.forEach((node)=> {
		if (node.attributes && node.attributes.className && node.attributes.className.join().indexOf('footnote') > -1) {
			footnotes.push(node);
		}
		if (node.type === 'Element') {
			checkForFootnotes(node.children);
		}
	});
}

function footnoteLink(node) {
	if (!node.children && node.tagName !== 'a') { return null; }
	if (node.tagName === 'a' && node.attributes.href.indexOf('#link-') > -1) { return node.attributes.href; }
	return node.children.reduce((prev, curr)=> {
		const currLink = footnoteLink(curr);
		if (currLink) { return currLink; }
		return prev;
	}, null);
}

function footnoteAuthor(node) {
	if (!node.children && node.tagName !== 'div') { return null; }
	if (node.tagName === 'div' && node.attributes.className && node.attributes.className.indexOf('footnote-author') > -1) { return node.children[0].content.replace('.',''); }
	return node.children.reduce((prev, curr)=> {
		const currLink = footnoteAuthor(curr);
		if (currLink) { return currLink; }
		return prev;
	}, null);
}

function footnoteContent(node) {
	if (!node.children && node.tagName !== 'div') { return null; }
	if (node.tagName === 'div' && node.attributes.className && node.attributes.className.indexOf('footnote-content') > -1) { return node; }
	return node.children.reduce((prev, curr)=> {
		const currLink = footnoteContent(curr);
		if (currLink) { return currLink; }
		return prev;
	}, null);
}

function findLinks(node, hash) {
	if (node.tagName === 'span' && node.attributes && node.attributes.id && node.attributes.id.indexOf('link-') > -1) { paragraphLinks[node.attributes.id] = hash; }
	// if (node.tagName === 'a' && node.attributes.href) { paragraphLinks[node.attributes.href] = hash; }
	if (node.children) {
		node.children.forEach((item)=> {
			findLinks(item, hash);
		});
	}
}

function buildParagraphLinks(node) {
	if (!node.children) { return null; }
	if (node.tagName === 'p') {
		findLinks(node, node.hash);
	}
	node.children.forEach((item)=> {
		buildParagraphLinks(item);
	});
}


const paragraphLinks = {};
buildParagraphLinks(documentJSON);
// console.log(JSON.stringify(paragraphLinks, null, 2));

// function findParentHash(link, node=documentJSON) {
// 	if (!node.children) { return null; }
// 	if (node.tagName === 'p') { return hasLink(node, link); }

// 	return node.children.reduce((prev, curr)=> {
// 		const currLink = findParentHash(link, curr);
// 		return currLink || prev;
// 	}, null);
// }

// function hasLink(node, link) {
// 	if (!node.children) { return null; }
// 	if (node.tagName === 'a' && node.attributes.href && node.attributes.href === link) { return true; }
// 	return node.children.reduce((prev, curr)=> {
// 		const currLink = hasLink(curr, link);
// 		return currLink || prev;
// 	}, null);
// }


const json = himalaya.parse(html);
checkForFootnotes(json);
const goodFootnotes = footnotes.filter((item)=> {
	return footnoteLink(item);
});

const labelOptions = [
	['Engineering'],
	['Ethics'],
	['Engineering', 'Ethics'],
];
const goodFootnoteObjects = goodFootnotes.map((item)=> {
	return {
		link: footnoteLink(item),
		author: footnoteAuthor(item),
		content: footnoteContent(item),
		anchor: paragraphLinks[footnoteLink(item).replace('#', '')],
		labels: labelOptions[Math.floor(Math.random() * 3)],
	};
}).filter((item)=> {
	return item.anchor;
});

// console.log(JSON.stringify(goodFootnoteObjects, null, 2));


fs.writeFile('static/sourceAnnotations.json', JSON.stringify(goodFootnoteObjects, null, 2), 'utf8', ()=> {
	console.log('Finished Processing');
});

