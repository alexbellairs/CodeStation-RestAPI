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

// logs in a user.

exports.login = async (req, res) => {
  try {
    const token = jwt.sign({ id: req.user._id }, process.env.SECRET);
    console.log("login" + req.user);
    if (!req.user) {
      throw new Error("Wrong Details");
    } else {
      console.log("Successful Login");
      res.send({ user: req.user, token });
    }
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

// used on the front end to delete one user from the database.
exports.deleteOne = async (req, res) => {
  try {
    const result = await User.deleteOne({ _id: req.user._id });
    if (result.deletedCount > 0) {
      res.send({ msg: "Successfully Deleted" });
    } else {
      throw new Error({ msg: "Something went wrong" });
    }
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

// find a user.
exports.listUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    res.send({ user });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

// updates one user in the database.
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

// finds all users in the database.
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

// used in the backend to remove a user.
exports.removeUser = async (req, res) => {
  try {
    const removeUser = await User.deleteOne({ username: req.params.username });
    res.send({ user: removeUser });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
