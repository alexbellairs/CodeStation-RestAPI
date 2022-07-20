const jwt = require("jsonwebtoken");
const User = require("./model");
// Signs up a user.
exports.signUp = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET);
  res.send({ user: newUser, token });
  } catch (error) {
  console.log(error);
  res.send({ error });
  }
};
// Logs a user in
exports.login = async (req, res) => {
  try {
    console.log("login" + req.user);
    if (!req.user) {
      throw new Error("Wrong Details");
    } else {
      console.log("Successful Login");
      res.send({ user: req.user });
    }
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
// Deletes one user from the database.
exports.deleteOne = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ username:req.params.username });
    res.send({user});
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
// Find a user.
exports.listUser = async (req, res) => {
  try {
    const user = await User.findOne({ username:req.params.username });
    res.send({user});
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
// Updates one user in the database.
exports.update = async (req, res) => {
  try {
    const userUpdates = await User.updateOne(
      req.body.userObj,
      req.body.updateObj
    );
    if (userUpdates.modifiedCount > 0) {
      res.status(200).send({ msg: "Successful Update" });
    } else {
      throw new Error({ msg: "Something went wrong" });
    }
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
// Finds all users in the database.
exports.findAll = async (req, res) => {
  try {
    const users = await User.find(req.params);
    if (!users) {
      throw new Error("No users found");
    } else {
      res.send({ users });
    } 
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

