const { Router } = require("express"); //import Router method only from express
const { signUp, login, listUser, findAll, update, deleteOne,} = require("./controllers"); //import only signUp from controllers file
const { hashPass,  unhashPass  } = require("../middleware");
const userRouter = Router(); //create a router that can have endpoints added to it

userRouter.post("/users", hashPass, signUp); //defining a post request on /user path, that calls the signUp controller
userRouter.post("/login", unhashPass, login); //defining a post request on /login path, that calls the login controller
userRouter.get("/user/:username", listUser); //defining a get request on /user:username path, that calls the find controller
userRouter.get("/findAll", findAll); //defining a get request on /users path, that calls the findAll controller
userRouter.patch("/users", hashPass, update); //defining a put request on /user path, that calls the update controller
userRouter.delete("/user/:username", deleteOne) //defining a delete request on /user/:username path, that calls the delUser controller
module.exports = userRouter;