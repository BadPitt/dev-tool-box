import React from 'react';
import {Component} from 'react';
import render from 'react-dom';


class Popup extends Component {
	render() {
		return (
			<div>
				<h2 title="schema">SCHEMA</h2>
				<input type="text" title="schema-input"/>
				<h2 title="source">SOURCE</h2>
				<input type="text" title="source-input"/>
				<button id="validateButton"></button>
			</div>
		);
	}
}

render(
	<Popup/>
	, document.getElementById('root'));

