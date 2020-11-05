import * as TYPE from 'actions/types';

const initialState = '';

export default (state = initialState, action) => {
	switch(action.type) {
		case TYPE.SWITCH_PAGE: {
			const { currentPage } = action.payload.moduleState || {};
			return currentPage !== undefined ? currentPage : state;
		}

		case TYPE.UPDATE_PAGE:
			return action.payload;
		
		default:
			return state;
	}
}