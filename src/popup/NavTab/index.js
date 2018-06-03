import React, {Component} from 'react';
import JSONValidationWidget from '../JSONValidationWidget';
import RegExpWidget from '../RegExpWidget';
import Utils from '../utils';
import ErrorBoundary from "../ErrorBoundary";
import './style.css';
import SwipeTransition from "./SwipeTransition";

const defaultNavTabState = {
	tabs: [
		{
			id: 'nav-validation-tab',
			controls: 'nav-json-validation',
			title: 'JSON',
			content: <JSONValidationWidget displayName='jsonWidget'/>
		},
		{
			id: 'nav-regexp-tab',
			controls: 'nav-regexp',
			title: 'RegExp',
			content: <RegExpWidget displayName='regexpWidget'/>
		}
	],
	activeTab: 'nav-validation-tab'
};

class NavTab extends Component {
	constructor(props) {
		super(props);
		this.state = defaultNavTabState
	}

	render() {
		let self = this;
		let classes = [
			'text-center', 'd-flex', 'flex-column',
			'flex-fill', 'nav-item', 'nav-link'
		];
		let tabs = self.state.tabs.map(function (tab) {
			let currentClasses = classes.slice();
			if (self.state.activeTab === tab.id) {
				currentClasses.push('active');
			}
			return <a className={currentClasses.join(" ")}
					  id={tab.id}
					  key={tab.id}
					  data-toggle="tab"
					  href={'#' + tab.controls}
					  onClick={self.onTabClick.bind(self)}
					  role="tab"
					  aria-controls={tab.controls}
					  aria-selected={self.state.activeTab === tab.id}>{tab.title}</a>;
		});
		let tabContents = self.state.tabs.map(function (tab) {

			let style = {position: 'absolute', width: '100%', height: '100%'};
			let classList = [
				'd-flex', 'flex-column',
				'flex-fill', 'tab-pane',
				'fade'];
			if (self.state.activeTab === tab.id) {
				classList.push('show', 'active');
			}
			return <SwipeTransition in={self.state.activeTab === tab.id}
									key={tab.controls}
									state={self.state}
									timeout={600}>
				{
					(classes) => {
						classList = classList.slice();
						classList.push(classes);
						return (
							<div className={classList.join(" ")}
								 id={tab.controls}
								 key={tab.controls}
								 role="tabpanel"
								 style={style}
								 aria-labelledby={tab.id}>

								<ErrorBoundary>
									{tab.content}
								</ErrorBoundary>

							</div>)
					}
				}
			</SwipeTransition>;
		}).filter((a) => !!a);

		return (
			<div className='d-flex flex-column flex-fill'>
				<nav className='d-flex flex-column'>
					<div className="d-flex nav nav-tabs" id="nav-tab" role="tablist">
						{tabs}
					</div>
				</nav>
				<div className="tab-content d-flex flex-column flex-fill"
					 style={{position: 'relative'}}
					 id="nav-tabContent">
					{tabContents}
				</div>
			</div>
		);
	}

	onTabClick(e) {
		if (e.target.id === this.state.activeTab) {
			return;
		}
		let state = Utils.shallowCopy(this.state);
		state.previousActive = state.activeTab;
		state.activeTab = e.target.id;
		this.setState(state);
	}
}

export default NavTab;