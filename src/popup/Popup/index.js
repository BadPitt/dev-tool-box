import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import JSONValidationWidget from '../JSONValidationWidget';
import RegExpWidget from '../RegExpWidget';
import Utils from '../utils';

class Popup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tabs: [
				{
					id: 'nav-validation-tab',
					controls: 'nav-json-validation',
					title: 'JSON Validation',
					content: <JSONValidationWidget/>
				},
				{
					id: 'nav-regexp-tab',
					controls: 'nav-regexp',
					title: 'RegExp checker',
					content: <RegExpWidget/>
				}
			],
			activeTab: 'nav-validation-tab'
		};
	}

	render() {
		let self = this;
		let tabs = self.state.tabs.map( function(tab) {
			return <a className={self.state.activeTab === tab.id ?
				"nav-item nav-link active" :
				"nav-item nav-link"}
					  id={tab.id}
					  key = {tab.id}
					  data-toggle="tab"
					  href={'#' + tab.controls}
					  onClick={self.onTabClick.bind(self)}
					  role="tab"
					  aria-controls={tab.controls}
					  aria-selected={self.state.activeTab === tab.id}>{tab.title}</a>;
		});
		//console.log(tabs);
		let tabContents = self.state.tabs.map( function(tab) {
			return <div className={self.state.activeTab === tab.id ?
				"d-flex flex-column flex-fill tab-pane fade show active" :
				"							  tab-pane fade"}
						id={tab.controls}
						key={tab.controls}
						role="tabpanel"
						aria-labelledby={tab.id}>{tab.content}</div>;
		});
		return (
			<div className='jumbotron d-flex flex-column'
				 style={{padding: 0, marginBottom: 0, height: "-webkit-fill-available"}}>
				<nav className='d-flex'>
					<div className="nav nav-tabs" id="nav-tab" role="tablist">
						{tabs}
					</div>
				</nav>
				<div className="tab-content d-flex flex-column flex-fill"
					 id="nav-tabContent">
					{tabContents}
				</div>
			</div>
		);
	}

	onTabClick(e) {
		let state = Utils.shallowCopy(this.state);
		state.activeTab = e.target.id;
		this.setState(state);
	}
}

export default Popup;