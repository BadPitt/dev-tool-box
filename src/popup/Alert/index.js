import React, {Component} from 'react';
import Status from '../ExecutionStatus';

class Alert extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		let {status={name:''}, errorMessage, successMessage='Valid!'} = this.props;
		let classes = getClasses(status);
		let isHidden = status.name !== Status.ERROR &&
			status.name !== Status.VALID;
		let message = status.name === Status.ERROR  ?
			errorMessage:
			status.name === Status.VALID ? successMessage: '';
		return (
			<div className={classes}
				 role='alert'
				 hidden={isHidden}>{message}</div>
		);
	}
}

function getClasses(status) {
	switch (status.name) {
		case Status.ERROR :
			return 'alert alert-danger py-1';
		case Status.VALID  :
			return 'alert alert-success';
		default:
			return '';
	}
}

export default Alert;