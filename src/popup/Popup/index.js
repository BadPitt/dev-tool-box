import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
// import 'animate.css/animate.css';
import NavTab from '../NavTab';
import ErrorBoundary from '../ErrorBoundary';

class Popup extends Component {
	render() {
		return (
			<div className='jumbotron d-flex flex-column'
				 style={{padding: 0, marginBottom: 0, height: "-webkit-fill-available"}}>
				<ErrorBoundary>
					<NavTab/>
				</ErrorBoundary>
			</div>
		);
	}
}

export default Popup;