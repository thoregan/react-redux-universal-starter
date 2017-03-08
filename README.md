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

## How to run
* Use 'npm run dev' to run in dev mode (listen to port 8080)
* Use 'npm run build' to generate files for production (Generate inside /dist)
* Use 'npm run start' to start express server (listen to port 8090)

## Serving static assets
Static assets are served through express, a gzip version is saved and used for html, css and js.

### Nginx
If you want to use nginx instead here is an example of configuration:
```
server {
    listen 80 default_server;
    server_name serverName;
    
    location / {
         proxy_pass http://127.0.0.1:8090;
    }
    
    location ~* \.(js)$  {
         gzip_static  on;
         root path/to/app/dist/;
    }
}
```
Don't forget to remove this lines from server/index.jsx to prevent express from serving static assets
``` js
app.get('*.(js|css|html)', (req, res, next) => {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use(express.static('./dist'));
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

#### Server
We added a polyfill to require.ensure for the server.

## How to get redux state inside containers:
You can make async actions with redux-thunk.  
Define actions to perform on server inside need params of containers.  

### For server:

Inside of containers add a static array 'need' with actions to call.  
``` js
static need = [actions1, actions2];
```
The server call all actions inside 'need' and wait for them to resolve.
### For client:

The code below call actions inside 'need' on the client.  
Call this into componentDidMount 
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
