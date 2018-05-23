import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Validator} from 'jsonschema';
import addressSchema from '../address-schema';
import address from '../address';
import Schema from './Schema';

class Popup extends Component {
	constructor(props) {
		super(props);
		let popup = this;
		this.state = {
			schemaValue: '',
			update: function(schema) {
				popup.state.schemaValue = schema;
				popup.setState(popup.state);
			}
		};
	}

	render() {
		return (
			<div className='jumbotron' style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0, marginBottom: 0}}>
				<div className='container'>
					<Schema schemaCallback={this.state.update}/>
					<h2 title="source"
						className='card-subtitle'>SOURCE</h2>
					<input type="text"
						   id="source-input"
						   className='input-group'/>
					<button id="validateButton"
							onClick={this.validate.bind(this)}
							className='btn mx-auto text-center'>validate</button>
				</div>
			</div>
		);
	}

	validate() {
		let input = document.getElementById('source-input').value;
		let schema = this.state.schemaValue; //document.getElementById('schema-input').value;
		let validator = new Validator();
		console.dir(schema);
		console.dir(input);
		console.log(`schema: ${schema}\ninput: ${input}\nresult:${validator.validate(input, schema, {throwError: true})}`);
	}
}

export default Popup;