import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from 'reducers';
import thunk from 'redux-thunk';
import routes from '../shared/routes';

const app = express();

// Static are served by nginx

function requestContextData(store = {}, { components = [] }) {
  const promises = components.reduce((prev, current = {}) => (
    (current.need || []).concat(prev)
  ), []).map(need => store.dispatch(need()));

  return Promise.all(promises);
}

app.use((req, res) => {
  const location = req.url;
  const reducer = combineReducers(reducers);
  const store = (createStore)(reducer, applyMiddleware(thunk));

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if (!renderProps) return res.status(404).end('Not found.');

    const InitialComponent = (
      <Provider store={store}>
        { <RouterContext {...renderProps} /> }
      </Provider>
    );

    requestContextData(store, renderProps).then(() => {
      const initialState = store.getState();

      const componentHTML = renderToString(InitialComponent);
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

      return res.end(HTML);
    });

    return null;
  });
});

module.exports = app;
