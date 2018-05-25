import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: ''
		};
	}

	render() {
		return (
			<div className='shadow-sm my-2 bg-white rounded flex-fill'>
				<div className='card-header'>
					<h2 title="source"
						className='card-subtitle text-center mt-md-1'>Source</h2>
				</div>
				<div className="input-group p-1">
					<textarea className="form-control"
							  id="source-input rounded-0"
							  value={this.state.inputValue}
							  onChange={this.onUpdateValue.bind(this)}
							  aria-label="Source"></textarea>
				</div>
				{/*<div>
				<h2 title="source"
					className='card-subtitle'>SOURCE</h2>
				<input type="text"
					   id="source-input"
					   value={this.state.inputValue}
					   onChange={this.onUpdateValue.bind(this)}
					   className='input-group'/>
			</div>*/}
			</div>
		);
	};

	onUpdateValue(e) {
		this.props.stateCallback(e.target.value);
		this.setState({
			inputValue: e.target.value
		});
	}
}

Input.propTypes = {
	stateCallback: PropTypes.func.isRequired
};

export default Input;