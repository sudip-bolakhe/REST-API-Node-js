const dotEnv = require("dotenv");
dotEnv.config();

module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT,
  TOKEN_SECRETE: process.env.TOKEN_SECRETE,
  TOKEN_EXPIRY_TIME: process.env.TOKEN_EXPIRY_TIME,
};
