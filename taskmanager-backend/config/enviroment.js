const env = require("env-var");

module.exports = DATABASE_URL = env.get("DATABASE_URL").required().asString();
