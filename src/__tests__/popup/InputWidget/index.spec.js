import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import InputWidget from '../../../popup/InputWidget';

Enzyme.configure({ adapter: new Adapter() });

describe("InputWidget tests", () => {
	let stateCallback = sinon.spy();
	let title = "Widget's Title";
	let inputWidget = shallow(<InputWidget onInputChange={stateCallback}
											 title={title} />);

	it("Title have to be the same as obtain property", () => {
		expect(inputWidget.find('h2').text()).toEqual(title);
	});

	it("Widget have to evaluates callback and send current data to parent when input changes", ()=> {
		let input = "input value";
		let event = {target:{value:input}};
		inputWidget.find('textarea').simulate('change', event);
		expect(stateCallback.calledOnce).toEqual(true);
		expect(stateCallback.calledWith(input)).toEqual(true);
	});
});