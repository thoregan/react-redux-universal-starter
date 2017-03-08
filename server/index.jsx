/* eslint-disable no-param-reassign */

import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from 'reducers';
import thunk from 'redux-thunk';
import routes from '../shared/routes';

// Create express server
const app = express();

// Serve static gzip for js, css and html files
app.get('*.(js|css|html)', (req, res, next) => {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

// Serving static with express server
app.use(express.static('./dist'));

// Function waiting for all promises to resolve
function requestContextData(store = {}, { components = [] }) {
  const promises = components.reduce((prev, current = {}) => (
    (current.need || []).concat(prev)
  ), []).map(need => store.dispatch(need()));

  return Promise.all(promises);
}

app.use((req, res) => {
  // Get the current url
  const location = req.url;

  // Get the reducers
  const reducer = combineReducers(reducers);

  // Create the store
  const store = (createStore)(reducer, applyMiddleware(thunk));

  // Look for url
  match({ routes, location }, (err, redirectLocation, renderProps) => {
    // Render http status code 500 if there is an error
    if (err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    // Render 404 not found if renderProps == null
    if (!renderProps) return res.status(404).end('Not found.');

    // Get the initial component
    const InitialComponent = (
      <Provider store={store}>
        { <RouterContext {...renderProps} /> }
      </Provider>
    );

    // Render the page after getting all the promises resolved
    requestContextData(store, renderProps).then(() => {
      // Get the state
      const initialState = store.getState();

      // Render the component as string
      const componentHTML = renderToString(InitialComponent);

      // Inject initial state and componentHtml to the page
      const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Isomorphic Redux Demo</title>
          <script type="application/javascript">
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          </script>
        </head>
        <body>
          <div id="react-view">${componentHTML}</div>
          <script type="application/javascript" src="/node-static.js"></script>
          <script type="application/javascript" src="/bundle.js"></script>
        </body>
    </html>    
    `;

      // Return the generate HTML to client
      return res.end(HTML);
    });

    return null;
  });
});

module.exports = app;
