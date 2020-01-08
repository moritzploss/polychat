const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    proxy("/api/websockets/clients/", {
      target: "http://localhost:8080",
      ws: true
    }),
    proxy("/api/login", {
      target: "http://localhost:8080",
    }),
    proxy("/api/register", {
      target: "http://localhost:8080",
    })
  );
};