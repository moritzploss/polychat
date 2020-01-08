// eslint-disable-next-line @typescript-eslint/no-var-requires
const proxy = require('http-proxy-middleware');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports = (app) => {
  app.use(
    proxy('/api/websockets/clients/', {
      target: 'http://localhost:8080',
      ws: true,
    }),
    proxy('/api/login', {
      target: 'http://localhost:8080',
    }),
    proxy('/api/register', {
      target: 'http://localhost:8080',
    }),
  );
};
