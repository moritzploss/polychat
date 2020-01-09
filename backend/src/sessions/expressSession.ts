import session = require('express-session');
import uuid = require('uuid/v4');

const sessionConfig = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  genid: () => uuid(),
  cookie: {
    maxAge: 60000,
  },
});

export { sessionConfig };
