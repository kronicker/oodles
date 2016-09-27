var webpackServer = require("./webpack-server");
var apiServer = require("./api-server");

const PORT = process.env.PORT || 8080;
const PROD = process.env.NODE_ENV === "production";

if (PROD) {
  apiServer(PORT);
} else {
  apiServer(PORT - 1);
  webpackServer(PORT);
}
