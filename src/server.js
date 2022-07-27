require("./db/connection"); // instantly run database connection.
const express = require("express"); // pull in all express modules
const userRouter = require("./users/routes"); // bring in all endpoints connected to userRouter.
const cors = require("cors"); // bring in cors module.
const app = express(); // create webserver constant to manipulate.
const port = process.env.PORT || 5001; // store supplied port or port 5001.

app.use(express.json()); // use express json parser.
app.use(cors()); // allows requests to be made from other Node applications of any origin.
app.use(userRouter);
app.get("/test", (req, res) => {
  res.send("Hello World");
});
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
}); // listening on port 5001 or provided port on current location (localhost).
