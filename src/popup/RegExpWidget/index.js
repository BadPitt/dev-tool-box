import React, {Component} from 'react';
import RegExpValidator from './RegExpValidator';
import ValidationWidget from '../ValidationWidget';

class RegExpWidget extends Component {

	render() {
		return (
			<ValidationWidget schemaTitle="RegExp"
							  inputTitle="Source"
							  successMessage="Matches!"
							  validate={this.validate.bind(this)}/>
		);
	}

	read(inputValue) {
		return inputValue;
	}

	validate(state, schemaWrapper, inputWrapper) {

			let input = inputWrapper(this.read);
			let regexp = schemaWrapper(this.read);

			console.log(
				`regexp: ${regexp}
				 input: ${input}
				 result:${RegExpValidator.validate(input, regexp)}`
			);

			let result = RegExpValidator.validate(input, regexp);
			return result[0];
	}
}

export default RegExpWidget;