'use strict';

const webpackServer = require("./webpack-server");
const apiServer = require("./api-server");
const serverConfig = require('./server/config').server;

const PORT = process.env.PORT || serverConfig.port;
const PROD = process.env.NODE_ENV === "production";

if (PROD) {
  apiServer(PORT);
}
else {
  apiServer(PORT - 1);
  webpackServer(PORT);
}
