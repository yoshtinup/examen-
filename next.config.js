const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([], {
  env: {
    LOGIN_API: process.env.LOGIN_API,
    LOGIN_MICROSOFT: process.env.LOGIN_MICROSOFT,
    LOGIN_CLIENT_ID: process.env.LOGIN_CLIENT_ID,
    LOGIN_REDIRECT_URI: process.env.LOGIN_REDIRECT_URI,
    LOGIN_SCOPE: process.env.LOGIN_SCOPE,
    JWT_SECRET: process.env.JWT_SECRET,
    HASURA_URL: process.env.HASURA_URL,
    HASURA_SECRET: process.env.HASURA_SECRET,
  },
});
