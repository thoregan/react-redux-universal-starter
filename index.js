/* eslint-disable */

'use strict';

require('babel-core/register')({});
require('babel-polyfill');

var server = require('./server');

const PORT = process.env.PORT || 8090;

server.listen(PORT);
