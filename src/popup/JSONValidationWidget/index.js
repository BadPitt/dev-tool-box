import React, {Component} from 'react';
import {Validator} from 'jsonschema';
import Utils from '../../utils';
import InputWidget from '../InputWidget';
import Alert from '../Alert';
import Status from '../ExecutionStatus';

class JSONValidationWidget extends Component {
	constructor(props) {
		super(props);
		let popup = this;
		this.state = {
			schemaValue: '',
			updateSchemaCallback: function (schema) {
				popup.state.regexpValue = schema;
				popup.setState(popup.state);
			},
			inputValue: '',
			updateInputCallback: function (input) {
				popup.state.inputValue = input;
				popup.setState(popup.state);
			}
		};
	}

	render() {
		return (
			<div className='d-flex flex-column flex-fill'>
				<div className='p-2 container d-flex flex-column flex-fill ff-container'>
					<InputWidget title="Schema"
								 stateCallback={this.state.updateSchemaCallback}/>
					<InputWidget title="Source"
								 stateCallback={this.state.updateInputCallback}/>
					<Alert status={this.state.status}
						   errorMessage={this.state.errorMessage}/>
				</div>
				<button id="validateButton"
						onClick={this.validate.bind(this)}
						style={{height: '10%'}}
						className='btn btn-primary btn-block btn-lg rounded-0'>Validate
				</button>
			</div>
		);
	}

	validate() {
		let state = Utils.shallowCopy(this.state);
		try {
			let input = JSON.parse(this.state.inputValue);
			let schema = JSON.parse(this.state.schemaValue);
			let validator = new Validator();
			console.dir(schema);
			console.dir(input);
			console.log(
				`schema: ${schema}
				input: ${input}
				result:${validator.validate(input, schema, {throwError: true})}`
			);

			state.status = Status.createValidStatus();
			this.setState(state);
		}
		catch (e) {
			console.log(e);
			state.status = Status.createErrorStatus(e.message);
			state.errorMessage = e.message;
			this.setState(state);
		}
	}
}

export default JSONValidationWidget;