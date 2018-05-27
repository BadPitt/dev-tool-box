import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Alert from '../../../popup/Alert';
import Status from '../../../popup/ExecutionStatus';

Enzyme.configure({adapter: new Adapter()});

describe("Alert component's tests", () => {
	let errorMessage = 'error';
	let successMessage = 'success';
	it("If status is success alert shows successMessage", () => {
		let status = Status.createValidStatus();
		const alert = shallow(<Alert status={status}
								   errorMessage={errorMessage}
								   successMessage={successMessage}/>);
		expect(alert.text()).toEqual(successMessage);
		expect(alert.getElement().props.hidden).toEqual(false);
	});

	it("If status is error alert shows errorMessage", () => {
		let status = Status.createErrorStatus();
		const alert = shallow(<Alert status={status}
								   errorMessage={errorMessage}
								   successMessage={successMessage}/>);
		expect(alert.text()).toEqual(errorMessage);
		expect(alert.getElement().props.hidden).toEqual(false);
	});

	it("If status is not error and is not success alert does not show anything", () => {
		let status = '';
		const alert = shallow(<Alert status={status}
									 errorMessage={errorMessage}
									 successMessage={successMessage}/>);
		expect(alert.text()).toEqual('');
		expect(alert.getElement().props.hidden).toEqual(true);
	});
});