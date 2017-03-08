import Immutable from 'immutable';

export const defaultState = Immutable.fromJS({
  isLoading: false,
  hasErrored: false,
  error: '',
  items: {},
});

export default function itemReducer(state = defaultState, action) {
  switch (action.type) {
    case 'ITEMS_HAS_ERRORED':
      return state.set('hasErrored', action.hasErrored);
    case 'ITEMS_IS_LOADING':
      return state.set('isLoading', action.isLoading);
    case 'ITEMS_FETCH_DATA_SUCCESS':
      return state.set('items', Immutable.fromJS(action.payload.navLinks));
    default:
      return state;
  }
}
