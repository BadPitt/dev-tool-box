'use strict';

// let changeColor = document.getElementById('changeColor');
//
// chrome.storage.sync.get('color', function(data) {
// 	changeColor.style.backgroundColor = data.color;
// 	changeColor.setAttribute('value', data.color);
// });
//
// changeColor.onclick = function(element) {
// 	let color = element.target.value;
// 	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
// 		chrome.tabs.executeScript(
// 			tabs[0].id,
// 			{code: 'document.body.style.backgroundColor = "' + color + '";'});
// 	});
// };

var Validator = require('jsonschema').Validator;
var v = new Validator();

// Address, to be embedded on Person
var addressSchema = {
	"id": "/SimpleAddress",
	"type": "object",
	"properties": {
		"lines": {
			"type": "array",
			"items": {"type": "string"}
		},
		"zip": {"type": "string"},
		"city": {"type": "string"},
		"country": {"type": "string"}
	},
	"required": ["country"]
};

// Person
var schema = {
	"id": "/SimplePerson",
	"type": "object",
	"properties": {
		"name": {"type": "string"},
		"address": {"$ref": "/SimpleAddress"},
		"votes": {"type": "integer", "minimum": 1}
	}
};

var p = {
	"name": "Barack Obama",
	"address": {
		"lines": [ "1600 Pennsylvania Avenue Northwest" ],
		"zip": "DC 20500",
		"city": "Washington",
		"country": "USA"
	},
	"votes": "lots"
};

v.addSchema(addressSchema, '/SimpleAddress');

let validateButton = document.getElementById('validateButton');
validateButton.onclick( function (element) {
	console.log(v.validate(p, schema));
} );