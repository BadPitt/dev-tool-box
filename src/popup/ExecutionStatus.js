
const VALID = 'VALID';
const ERROR = 'ERROR';

class ExecutionStatus {
	constructor(statusName, statusDescription) {
		this._name = statusName;
		this._description = statusDescription;
	}

	get description() {
		return this._description;
	}

	get name() {
		return this._name;
	}
}

function createValidStatus(description="Valid") {
	return new ExecutionStatus(VALID, description);
}

function createErrorStatus(description="Unrecognised error") {
	return new ExecutionStatus(ERROR, description);
}

export default {
	createValidStatus,
	createErrorStatus,
	VALID,
	ERROR
};