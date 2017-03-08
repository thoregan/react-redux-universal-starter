# react-redux-universal-starter
A simple universal react and redux starter

Here is the features of this starter
  -React
  -Redux
  -React-Router (Same file for server and client)
  -Immutable.js
  -Axios
  -Hot reloading
  -Server side rendering (node.js + express)
  -Production Ready (Minification,gz static compression, Commons chunck plugin)
  -Redux-thunk

How to get props:

For server:
Inside of containers add a static array 'need' with actions to call

  static need = [actions1, actions2];

The server wait for all the promise inside need to be done before sending to client

For client:
Inside componentDidMount function:

  Add a function like this:
    ClassName.need.map(need => this.props.dispatch(need()));
  
  Make sure to call this action only if props are not already loaded by server
