const jwt = require("jsonwebtoken");
const userService = require("../service/UserService");
const bcrypt = require("bcryptjs");
const config = require("../config/config");

const login = async (email, password) => {
  var dbUser = null;
  return userService
    .findUserByEmail(email)
    .then((user) => {
      if (user) {
        console.log("User found");
        return user;
      } else {
        throw new Error("Email does not match to any user");
      }
    })
    .then((user) => {
      console.log("Checking Password");
      dbUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      console.log("Matched :" + matched + " " + dbUser);
      if (matched) {
        return jwt.sign(
          { id: dbUser._id, roles: dbUser.roles },
          config.TOKEN_SECRETE,
          {
            expiresIn: config.TOKEN_EXPIRY_TIME,
          }
        );
      } else {
        throw new Error("Email and password doesnot matched!!");
      }
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
};

const autheticate = (req, res, next) => {
  //get the token from the header if present
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  //if no token found, return response (without going to the next middelware)
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    //if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, config.TOKEN_SECRETE);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (ex) {
    //if invalid token
    res.status(400).send("Invalid token.");
  }
};
module.exports = { login, autheticate };
