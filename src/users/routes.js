const { Router } = require("express"); //import Router method only from express.
const {
  signUp,
  login,
  listUser,
  findAll,
  update,
  deleteOne,
  removeUser,
} = require("./controllers"); //import only signUp from controllers file.
const { hashPass, comparePass, tokenCheck } = require("../middleware");
const userRouter = Router(); //create a router that can have endpoints added to it.

userRouter.post("/users", hashPass, signUp); //defining a post request on /user path, that calls the signUp controller.
userRouter.post("/login", comparePass, login); //defining a post request on /login path, that calls the login controller.
userRouter.get("/user", tokenCheck, login); //defining a post request on /token path, that calls both token and login
userRouter.get("/user/:username", listUser); //defining a get request on /user:username path, that calls the find controller.
userRouter.get("/findAll", findAll); //defining a get request on /users path, that calls the findAll controller.
userRouter.patch("/users", hashPass, update); //defining a put request on /user path, that calls the update controller.
userRouter.delete("/user", tokenCheck, deleteOne); //defining a delete request on /user/:username path, that calls the delUser controller.
userRouter.delete("/user/:username", removeUser);

module.exports = userRouter;
