const OktaJwtVerifier = require('@okta/jwt-verifier');
require('dotenv').config();

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: process.env.OKTA_ISSUER,
  clientId: process.env.OKTA_CLIENT_ID,
});

module.exports = async (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).send();
  }

  const [authType, token] = authorization.trim().split(' ');

  try {
    const { claims } = await oktaJwtVerifier.verifyAccessToken(token, process.env.OKTA_AUDIENCE);

    if (!claims) {
      return response.status(401).send();
    }
    if (!claims.scp.includes('api')) {
      return response.status(401).send();
    }

    return next();
  } catch (err) {
    console.log(err);
    return response.status(401).send();
  }
};
