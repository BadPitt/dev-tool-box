import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Schema extends Component {
	constructor(props) {
		super(props);
		this.state = {
			schemaValue: ''
		};
	}

	render() {
		return (
			<div className='shadow-sm my-2 bg-white rounded flex-fill'>
				<div className='card-header'>
				<h2 title="schema"
					className='card-subtitle text-center'>Schema</h2>
				</div>
				<div className="input-group p-1">
					<textarea className="form-control rounded-0"
							  id="schema-input"
							  value={this.state.schemaValue}
							  onChange={this.onUpdateValue.bind(this)}
							  aria-label="Schema"></textarea>
				</div>
				{/*<input type="text"
					   id="schema-input"
					   value={this.state.schemaValue}
					   onChange={this.onUpdateValue.bind(this)}
					   className='input-group'/>*/}
			</div>
		);
	};

	onUpdateValue(e) {
		this.props.stateCallback(e.target.value);
		this.setState({
			schemaValue: e.target.value
		});
	}
}

Schema.propTypes = {
	stateCallback: PropTypes.func.isRequired
};

export default Schema;