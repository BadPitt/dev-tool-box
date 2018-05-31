import React, {Component} from 'react';
import Utils from '../utils';
import InputWidget from '../InputWidget';
import Alert from '../Alert';
import RegExpValidator from './RegExpValidator';
import Status from '../ExecutionStatus';

class RegExpWidget extends Component {
	constructor(props) {
		super(props);
		let popup = this;
		this.state = {
			regexpValue: '',
			updateRegExpCallback: function (regexp) {
				popup.state.regexpValue = regexp;
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
					<InputWidget title="RegExp"
								 onInputChange={this.state.updateRegExpCallback}/>
					<InputWidget title="Source"
								 onInputChange={this.state.updateInputCallback}/>
					<Alert status={this.state.status}
						   errorMessage={this.state.errorMessage}
						   successMessage="Matches!"/>
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

			let input = this.state.inputValue;
			let regexp = this.state.regexpValue;

			console.log(
				`regexp: ${regexp}
				 input: ${input}
				 result:${RegExpValidator.validate(input, regexp)}`
			);

			let result = RegExpValidator.validate(input, regexp);

			state.status = Status.createValidStatus(result[0]);
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

export default RegExpWidget;