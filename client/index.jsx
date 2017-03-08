import React from 'react';
import { render } from 'react-dom';
import { match, Router } from 'react-router';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from 'reducers';
import thunk from 'redux-thunk';
import routes from 'routes';
import Immutable from 'immutable';
import createBrowserHistory from 'history/lib/createBrowserHistory';

// Get the initial state from the server
const initialState = window.__INITIAL_STATE__;

// Transform initial state to immutable
Object
  .keys(initialState)
  .forEach((key) => {
    initialState[key] = Immutable.fromJS(initialState[key]);
  });

// Add the redux tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers(reducers);

// Create the store
const store = createStore(reducer, initialState, composeEnhancers(
  applyMiddleware(thunk),
));

const history = createBrowserHistory();

match({ history, routes }, (error, redirectLocation, renderProps) => {
  render(
    <Provider store={store}>
      <Router {...renderProps} />
    </Provider>,
    document.getElementById('react-view'),
  );
});
