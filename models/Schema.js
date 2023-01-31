const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const PersonSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: [true, "Please provide an Email"],
    lowercase: true,
    validate: [isEmail, ["Please enter a Valid Email"]],
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    minlength: [6, "Please enter over 6 digits"],
  },
});
//post can also be used for after the data is saved to DB
//we can use pre method to run the function before data was saved to the DB
PersonSchema.pre("save", async function (next) {
  console.log("user is about to be created", this);
  //here this is the local instance of the user while saving the DB
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//to login user :

PersonSchema.statics.login = async function (Email, password) {
  const user = await this.findOne({ Email: Email });
  if (user) {
    //if email is correct we can now check the hashed pass
    const passcheck = await bcrypt.compare(password, user.password);
    if (passcheck) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect Email");
};

const SomePerson = mongoose.model("People", PersonSchema);
module.exports = SomePerson;