const jwt = require("jsonwebtoken");
const User = require("./../models/Schema");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  //checking if token exists
  if (token) {
    jwt.verify(
      token,
      "secretusedbyjwttocreatetoken123456",
      (err, decodedToken) => {
        //checking if token is valid or not with the secret provided
        if (err) {
          res.redirect("/login");
          console.log(err.message);
        } else {
          next();
        }
      }
    );
  } else {
    res.redirect("/login");
  }
};
module.exports = { requireAuth };
