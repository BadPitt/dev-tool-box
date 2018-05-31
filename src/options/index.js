'use strict';

import React, {Component} from 'react';
import reactDOM from 'react-dom';
import './options.css';
import 'bootstrap/dist/css/bootstrap.css';

class Options extends Component {
	constructor(props) {
		super(props);
		let allFeatures = [
			{
				id: 'JSON_VALIDATION',
				name: 'json validation'
			},
			{
				id: 'XML_VALIDATION',
				name: 'xml validation'
			},
			{
				id: 'REGEXP',
				name: 'regexp checking'
			}];
		this.state = {
			features: allFeatures,
			activeFeatures: allFeatures
		}
	}

	render() {
		let activeFeatures = this.state.activeFeatures.map((feature) => {
			return (<li key={feature.id}>
				<div>{feature.name}</div>
				<input type='radio'/>
			</li>);
		});
		return (
			<div className='container'>
				<div className='card mx-auto'
					 style={{marginTop: 75, width: '45%'}}>

					<div className='card-header'>
						<h1 className='card-subtitle m-3 text-center'>Options</h1>
					</div>
					<div className='card-body'>
						<p className='card-text'>Hi! There you can customize behavior of instrumentation</p>
						<ul>
							{activeFeatures}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

reactDOM.render(
	<Options/>
	, document.getElementById('option-root'));
