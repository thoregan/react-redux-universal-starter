import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'layout/index';
import Home from 'pages/index';
import Example from 'components/Example';

// Polyfill require.ensure for node.js
if (typeof require.ensure !== 'function') {
  require.ensure = (d, c) => {
    c(require);
  };
}

export default (
  <Route component={App} path="/">
    <IndexRoute component={Home} />

    { /* Normal Component loading */ }
    <Route path="exampleDumb" component={Example} />

    { /* Lazy loaded component */ }
    <Route
      path="example"
      getComponent={(location, cb) => {
        require.ensure([],
          (require) => {
            cb(null, require('containers/Example').default);
          });
      }}
    />
  </Route>
);

