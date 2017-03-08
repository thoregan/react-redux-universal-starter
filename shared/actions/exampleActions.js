import request from 'axios';

export function itemsHasErrored(bool) {
  return {
    type: 'ITEMS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function itemsIsLoading(bool) {
  return {
    type: 'ITEMS_IS_LOADING',
    isLoading: bool,
  };
}

export function itemsFetchDataSuccess(items) {
  return {
    type: 'ITEMS_FETCH_DATA_SUCCESS',
    payload: items,
  };
}

const URL = 'http://192.168.1.21:3000/v1/nav_links';
export function itemsFetchData() {
  return (dispatch) => {
    // Request is loading
    dispatch(itemsIsLoading(true));

    return request.get(URL)
      .then((response) => {
        // Request is not loading anymore
        dispatch(itemsIsLoading(false));

        return response;
      })
      .then(response => dispatch(itemsFetchDataSuccess(response.data))) // No errors dispatch action for fetching data
      .catch((error) => {
        // Request error, print and dispatch error to state
        console.log(error);
        return dispatch(itemsHasErrored(true));
      });
  };
}
