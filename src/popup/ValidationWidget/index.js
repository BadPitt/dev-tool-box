import React, {Component} from 'react';
import Utils from '../utils';
import InputWidget from '../InputWidget';
import Alert from '../Alert';
import Status from "../ExecutionStatus";

const getDefaultState = function (self) {
	return {
		schemaValue: '',
		updateSchemaCallback: function (schema) {
			self.state.schemaValue = schema;
			self.setState(self.state);
		},
		inputValue: '',
		updateInputCallback: function (input) {
			self.state.inputValue = input;
			self.setState(self.state);
		}
	}
};

class ValidationWidget extends Component {
	constructor(props) {
		super(props);
		this.state = getDefaultState(this);
	}

	render() {
		this.validate = this.props.validate;
		let {schemaTitle, inputTitle, successMessage} = this.props;
		return (
			<div className='d-flex flex-column flex-fill'>
				<div className='p-2 container d-flex flex-column flex-fill ff-container'>
					<InputWidget title={schemaTitle}
								 onInputChange={this.state.updateSchemaCallback}/>
					<InputWidget title={inputTitle}
								 onInputChange={this.state.updateInputCallback}/>
					<Alert status={this.state.status}
						   errorMessage={this.state.errorMessage}
						   successMessage={successMessage}/>
				</div>
				<button id="validateButton"
						onClick={this.preValidate.bind(this)}
						style={{height: '10%'}}
						className='btn btn-primary btn-block btn-lg rounded-0'>Validate
				</button>
			</div>
		);
	}

	preValidate() {
		let state = Utils.shallowCopy(this.state);
		try {
			let inputWrapper = readFunction => readFunction(state.inputValue);
			let schemaWrapper = readFunction => readFunction(state.schemaValue);
			let result = this.validate(state, schemaWrapper, inputWrapper);

			state.status = Status.createValidStatus(result);
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

export default ValidationWidget;