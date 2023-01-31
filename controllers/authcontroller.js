const path = require("path");
const User = require("./../models/Schema");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { Email: "", password: "" };

  if(err.message === "incorrect password"){
    errors.password = "wrong password"
  }
  if(err.message === "incorrect Email"){
    errors.Email = "Email isnt registered"
  }

  //only to find the validation errors (because of schema)
  if (err.message.includes("People validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
const maxage = 3 * 24 * 60 * 60; // takes in seconds
const createtoken = function (id) {
  return jwt.sign({ id }, "secretusedbyjwttocreatetoken123456", {
    expiresIn: maxage,
  });
  //second entry is the secret used by jwt to create the token
};

module.exports.signup_get = (req, res) => {
  res.sendFile(path.join(__dirname, "/../views/signup.html"));
};
module.exports.login_get = (req, res) => {
  res.sendFile(path.join(__dirname, "/../views/login.html"));
};
module.exports.signup_post = async (req, res) => {
  const { Email, password } = req.body;
  const findinguser = await User.findOne({ Email: req.body.Email });
  if (findinguser != null) {
    console.log("Email is taken");
  } else {
    try {
      const user = await User.create({ Email, password });
      const token = createtoken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxage * 1000 });
      //first jwt is name, second value is type, and other {} are the properties
      res.status(201).json({ user: user._id });
    } catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
  }
};
module.exports.login_post = async (req, res) => {
  const { Email, password } = req.body;
  try {
    const user = await User.login(Email, password);
    const token = createtoken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxage * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({errors});
  }
};

module.exports.logout_get = async (req, res) => {
  res.cookie('jwt', '', {maxAge : 1})
  res.redirect('/')
  //this replaces jwt token with '' or blank token
}
