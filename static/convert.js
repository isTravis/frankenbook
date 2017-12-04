/* eslint-disable no-param-reassign */
/* eslint-disable no-console */

const fs = require('fs');
const himalaya = require('himalaya');
const hash = require('object-hash');

const bookHtml = fs.readFileSync('static/bookSource.html', { encoding: 'utf8' });
const essaysHtml = fs.readFileSync('static/essaysSource.html', { encoding: 'utf8' });


function removeEmptyNodes (nodes) {
	return nodes.filter((node) => {
		if (node.type === 'Element') {
			node.children = removeEmptyNodes(node.children);
			return true;
		}
		return node.content.length;
	}).filter((node) => {
		if (node.content) {
			return !!node.content.trim().length;
		}
		return true; // Remove nodes with empty children
	}).map((node)=> {
		if (node.attributes && !Object.keys(node.attributes).length) {
			node.attributes = undefined;
		}
		if (node.children && !node.children.length) {
			node.children = undefined;
		}
		if (node.type === 'Element' && node.tagName !== 'div') {
			node.hash = hash.sha1(node).substring(0, 6);
		}
		node.type = undefined;
		return node;
	});
}

function removeWhitespace(nodes) {
	return removeEmptyNodes(nodes);
}

const bookJSON = himalaya.parse(bookHtml);
const cleanBookJSON = removeWhitespace(bookJSON);
fs.writeFile('static/bookSource.json', JSON.stringify(cleanBookJSON[0], null, 2), 'utf8', ()=> {
	console.log('Finished Processing Book');
});

const essaysJSON = himalaya.parse(essaysHtml);
const cleanEssaysJSON = removeWhitespace(essaysJSON);
fs.writeFile('static/essaysSource.json', JSON.stringify(cleanEssaysJSON[0], null, 2), 'utf8', ()=> {
	console.log('Finished Processing Essays');
});

