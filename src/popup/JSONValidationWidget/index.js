import React, {Component} from 'react';
import {Validator} from 'jsonschema';
import ValidationWidget from '../ValidationWidget';

class JSONValidationWidget extends Component {

	render() {
		return (
			<ValidationWidget schemaTitle="Schema"
							  inputTitle="Source"
							  successMessage="Valid!"
							  validate={this.validate.bind(this)}/>
		);
	}

	read(inputValue) {
		return JSON.parse(inputValue);
	}

	validate(state, schemaWrapper, inputWrapper) {
		let input = inputWrapper(this.read);
		let schema = schemaWrapper(this.read);
		let validator = new Validator();
		console.dir(schema);
		console.dir(input);
		console.log(
			`schema: ${schema}
				input: ${input}
				result:${validator.validate(input, schema, {throwError: true})}`
		);
	}
}

export default JSONValidationWidget;