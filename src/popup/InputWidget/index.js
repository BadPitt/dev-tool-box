import React, {Component} from 'react';
import PropTypes from 'prop-types';

class InputWidget extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: ''
		};
	}

	render() {
		return (
			<div className='shadow-sm my-2 bg-white rounded d-flex flex-column flex-fill ff-container'>
				<div className='card-header ff-header'>
					<h2 title={this.props.title.toLowerCase()}
						className='card-subtitle text-center mt-md-1'>{this.props.title}</h2>
				</div>
				<div className="input-group p-1 flex-fill ff-body">
					<textarea className="form-control rounded-0"
							  id={this.props.title.toLowerCase() + '-input'}
							  value={this.state.inputValue}
							  onChange={this.onUpdateValue.bind(this)}
							  aria-label={this.props.title}></textarea>
				</div>
			</div>
		);
	};

	onUpdateValue(e={target:{value:''}}) {
		this.props.onInputChange(e.target.value);
		this.setState({
			inputValue: e.target.value
		});
	}
}

InputWidget.propTypes = {
	onInputChange: PropTypes.func.isRequired
};

export default InputWidget;