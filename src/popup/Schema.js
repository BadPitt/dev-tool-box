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
			<div>
				<h2 title="schema"
					className='card-subtitle'>SCHEMA</h2>
				<input type="text"
					   id="schema-input"
					   value={this.state.schemaValue}
					   onChange={this.onUpdateValue.bind(this)}
					   className='input-group'/>
			</div>
		);
	};

	onUpdateValue(e) {
		this.props.update(e.target.value);
		this.setState({
			schemaValue: e.target.value
		});
	}
}

Schema.propTypes = {
	update: PropTypes.func.isRequired
};

export default Schema;