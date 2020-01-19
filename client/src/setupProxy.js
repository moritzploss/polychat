// eslint-disable-next-line @typescript-eslint/no-var-requires
const proxy = require('http-proxy-middleware');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports = (app) => {
  app.use(
    proxy('/api/websockets/clients/', {
      target: 'http://localhost:8080',
      ws: true,
    }),
    proxy('/api', {
      target: 'http://localhost:8080',
    }),
    proxy('/api/login', {
      target: 'http://localhost:8080',
    }),
    proxy('/api/users', {
      target: 'http://localhost:8080',
    }),
    proxy('/api/contactlist', {
      target: 'http://localhost:8080',
    }),
    proxy('/api/register', {
      target: 'http://localhost:8080',
    }),
    proxy('/api/validate-session', {
      target: 'http://localhost:8080',
    }),
    proxy('/api/destroy-session', {
      target: 'http://localhost:8080',
    }),
  );
};
