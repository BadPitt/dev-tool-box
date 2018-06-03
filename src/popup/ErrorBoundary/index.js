import React, {Component} from 'react';


class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false
		}
	}

	componentDidCatch(error, info) {
		// Display fallback UI
		this.setState({ hasError: true });
		// You can also log the error to an error reporting service
		this.logError(error, info);
	}

	render() {
		if (this.state.hasError) {
			return <div className='mx-auto'
						style={{marginTop: 75, width: '65%'}}>
				<h1>Something went wrong</h1>
			</div>;
		}
		return this.props.children;
	}

	logError(error, info) {
		console.log(error);
		console.log(info);
	}
}

export default ErrorBoundary;