const jwt = require("jsonwebtoken");
const secret = process.env.JWT_KEY;

module.exports = jwtService = {
  signToken: (payLoad, expiration) => {
    return jwt.sign(payLoad, secret, {
      expiresIn: expiration,
    });
  },

  verifyToken: (token, callbackfn) => {
    jwt.verify(token, secret, callbackfn);
  },
};
