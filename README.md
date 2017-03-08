# react-redux-universal-starter
A simple *universal* react and redux starter

Here is the features of this starter
* [React]
* [Redux]
* [React-router]
* [Immutable.js]
* [Axios]
* [Redux-thunk]
* Hot reloading
* Server side rendering (node.js + express)
* Production Ready (Minification,gz static compression, Commons chunck plugin)

## Installation:
Simply clone the repository:
```
$ git clone git@github.com:thoregan/react-redux-universal-starter.git your_app_folder
```

## How routes are managed:
We managed routes with react-routes, inside 'shared/routes.jsx'.
Refer to [React-router].
You can use lazy loading by calling getComponent and require.ensure instead of component.
``` js
    <Route
      path="path/to/route"
      getComponent={(location, cb) => {
        require.ensure([],
          (require) => {
            cb(null, require('path/to/component').default);
          });
      }}
    />
```
This way the component are not loaded in the main bundle, but, when you enter this route.
We added a polyfill to require.ensure for the server.

## How to get redux state inside containers:
You can make async actions with redux-thunk,and inside each containers you can define the actions you want the server to perform before sending to client with the static 'need'.

### For server:

Inside of containers add a static array 'need' with actions to call.
``` js
static need = [actions1, actions2];
```
The server wait for all the promise inside need to be done before sending to client.

### For client:

Add this inside componentDidMount of the container:
``` js
ClassName.need.map(need => this.props.dispatch(need()));
```
!!! Make sure to call this only if props are not already loaded by server.

[react]: https://github.com/facebook/react
[Redux]: https://github.com/reactjs/redux
[React-router]: https://github.com/ReactTraining/react-router
[Immutable.js]: https://github.com/facebook/immutable-js
[Axios]: https://github.com/mzabriskie/axios
[Redux-thunk]: https://github.com/gaearon/redux-thunk
