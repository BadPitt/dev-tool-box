import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Validator} from 'jsonschema';
import addressSchema from '../address-schema';
import address from '../address';
import Schema from './Schema';
import Input from './Input';

class Popup extends Component {
	constructor(props) {
		super(props);
		let popup = this;
		this.state = {
			schemaValue: '',
			updateSchemaCallback: function(schema) {
				popup.state.schemaValue = schema;
				popup.setState(popup.state);
			},
			inputValue: '',
			updateInputCallback: function(input) {
				popup.state.inputValue = input;
				popup.setState(popup.state);
			}
		};
	}

	render() {
		return (
			<div className='jumbotron d-flex' style={{paddingTop: 0, paddingLeft: 0, paddingRight: 0, marginBottom: 0, height: "-webkit-fill-available"}}>
				<div className='container p-2 d-flex flex-column flex-fill'>
					<Schema stateCallback={this.state.updateSchemaCallback}/>
					<Input stateCallback={this.state.updateInputCallback} />
					<button id="validateButton"
							onClick={this.validate.bind(this)}
							className='btn btn-primary fixed-bottom btn-block btn-lg rounded-0'>Validate</button>
					<div className={this.state.status === 'ERROR' ? 'alert alert-danger py-1' :
						this.state.status === 'VALID' ? 'alert alert-success': ''}
						 role='alert'
						 hidden={this.state.status !== 'ERROR' &&
					this.state.status !== 'VALID'}>{
						this.state.status === 'ERROR' ? this.state.errorMessage :
						this.state.status === 'VALID' ? 'Valid!' : ''}</div>
				</div>
			</div>
		);
	}

	validate() {
		let state = _clone(this.state);
		try {
			let input = JSON.parse(this.state.inputValue); //JSON.parse(document.getElementById('source-input').value);
			let schema = JSON.parse(this.state.schemaValue); //document.getElementById('schema-input').value;
			let validator = new Validator();
			console.dir(schema);
			console.dir(input);
			console.log(`schema: ${schema}\ninput: ${input}\nresult:${validator.validate(input, schema, {throwError: true})}`);

			state.status = 'VALID';
			this.setState(state);
		} catch (e) {
			console.log(e);
			state.status = 'ERROR';
			state.errorMessage = e.message;
			this.setState(state);
		}
	}
}

function _clone(obj) {
	let result = {};
	for (let prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			result[prop] = obj[prop];
		}
	}
	return result;
}


export default Popup;