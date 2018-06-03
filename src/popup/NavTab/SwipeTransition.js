import React from 'react';
import Transition from 'react-transition-group/Transition';

function SwipeTransition ({children, in:inProp, timeout, state}) {
	let {tabs, activeTab, previousActiveTab} = state;
	return (
		<Transition in={inProp}
					timeout={timeout}
					mountOnEnter={true}
					unmountOnExit={true}>
			{
				// Children is a function that receives classes
				// of the animation.
				/*
				 * enum State {
				 *	entering,
				 * 	entered,
				 *	exiting,
				 *	exited
				 * }
				 */
				(state) => {
					console.dir(children);
					let classes = SwipeAnimation(state, _getChangeDirection(tabs, activeTab, previousActiveTab));
					return children(classes);
				}
			}
		</Transition>
	);

	function _getChangeDirection(tabs, activeTab, previousActiveTab) {
		let previousIndex = 0;
		let currentIndex = 0;
		for (let i = 0; i < tabs.length; i++) {
			if (tabs[i].id === previousActiveTab) {
				previousIndex = i;
			} else if (tabs[i].id === activeTab) {
				currentIndex = i;
			}
		}
		return currentIndex > previousIndex ?
			ChangeDirection.TO_RIGHT :
			// default direction
			ChangeDirection.TO_LEFT;
	}
}

const ChangeDirection = {
	TO_RIGHT: 'TO_RIGHT',
	TO_LEFT: 'TO_LEFT'
};

const SwipeAnimation = function (status, direction) {
	if (!status || !SwipeDirectionAnimation[status]) {
		return;
	}
	return SwipeDirectionAnimation[status][direction];
};

const SwipeDirectionAnimation = {
	entering: {
		TO_RIGHT: 'animated fadeInRight',
		TO_LEFT: 'animated fadeInLeft'
	},
	entered: {

	},
	exiting: {
		TO_RIGHT: 'animated fadeOutLeft',
		TO_LEFT: 'animated fadeOutRight'
	},
	exited: {

	}
};

export default SwipeTransition;