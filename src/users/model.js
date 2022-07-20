
<<<<<<< HEAD
// Model: It represents the structure and constraints of the data stored in the database.


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
=======
>>>>>>> 6322b95ca6f22c5849b80fd36dfe3bb768569bb9
