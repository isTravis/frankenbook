/* eslint-disable no-param-reassign */
/* eslint-disable no-console */

const fs = require('fs');
const himalaya = require('himalaya');

const html = fs.readFileSync('static/source.html', { encoding: 'utf8' });


function removeEmptyNodes (nodes) {
	return nodes.filter((node) => {
		if (node.type === 'Element') {
			node.children = removeEmptyNodes(node.children);
			return true;
		}
		return node.content.length;
	}).filter((node) => {
		if (node.children) {
			return node.children.length;
		}
		return true; // Remove nodes with empty children
	}).map((node)=> {
		if (node.attributes && !Object.keys(node.attributes).length) {
			node.attributes = undefined;
		}
		return node;
	}).map((node)=> {
		node.type = undefined;
		return node;
	});
}

function stripWhitespace (nodes) {
	return nodes.map((node) => {
		if (node.type === 'Element') {
			node.children = stripWhitespace(node.children);
		} else {
			node.content = node.content.trim();
		}
		return node;
	});
}

function removeWhitespace(nodes) {
	return removeEmptyNodes(stripWhitespace(nodes));
}

const json = himalaya.parse(html);
const cleanJSON = removeWhitespace(json);

fs.writeFile('static/source.json', JSON.stringify(cleanJSON[0], null, 2), 'utf8', ()=> {
	console.log('Finished Processing');
});

