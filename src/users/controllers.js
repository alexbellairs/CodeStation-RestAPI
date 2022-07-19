const jwt = require("jsonwebtoken");
const User = require("./model");

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

exports.deleteOne = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ username:req.params.username });
    res.send({user});
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

exports.listUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    res.send({user});
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

