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

exports.deleteUser = async (req, res) => {
  try {
    const delUser = await User.deleteOne({
      username: req.params.username,
    });
    const secret = process.env.SECRET;
    const token = jwt.verify(secret, {
      username: req.username,
    });
    res.send({ user: delUser }, token);
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

// exports.deleteUser = async (req, res) => {
//   try {
//     const user = await User.deleteOne({
//       _id: req.user._id,
//     });
//     if (user.deletedCount > 0) {
//       res.send({ msg: "Deleted user" });
//     } else {
//       throw new Error("Error in request");
//     }
//   } catch (error) {
//     console.log(error);

//     res.send({ msg: "Error deleting user", error });
//   }
// };

// exports.deleteOne = async (req, res) => {
//   try {
//     const result = await User.deleteOne({ _id: req.user._id });
//     if (result.deletedCount > 0) {
//       res.send({ msg: "Successfully Deleted" });
//     } else {
//       throw new Error({ msg: "Something went wrong" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.send({ error });
//   }
// };
// Find a user.
exports.listUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    res.send({ user });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

// Updates password for user in the database.

exports.updatePassword = async (req, res) => {
  try {
    const updatePassword = await User.updateOne(
      { username: req.body.username },
      { $set: { password: req.body.password } }
    );
    res.send({
      updatePassword,
      message: `Password update for ${req.body.username}`,
    });
  } catch (error) {
    console.log(error);
    res.send({ error, message: "Password update failure" });
  }
};

// Alex B - update function
// exports.update = async (req, res) => {
//   try {
//     const userUpdates = await User.updateOne(
//       { email: req.body.email },
//       { password: req.params.password },
//       { $set: { password: req.body.password } }
//     );
//     if (userUpdates.modifiedCount > 0) {
//       res.status(200).send({ msg: "Successful Update" });
//     } else {
//       throw new Error({ msg: "Something went wrong" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.send({ error });
//   }
// };
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

exports.removeUser = async (req, res) => {
  try {
    const removeUser = await User.deleteOne({ username: req.params.username });
    res.send({ user: removeUser });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
