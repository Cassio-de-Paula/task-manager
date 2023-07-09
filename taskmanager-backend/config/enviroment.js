const env = require("env-var");

module.exports = JWT_KEY = env.get("JWT_KEY").required().asString();
