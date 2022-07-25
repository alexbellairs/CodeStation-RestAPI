const mongoose = require("mongoose");

const UserEventsSchema = new mongoose.Schema({
  user: {
    type: Null, // user object
    required: true,
  },
  event: {
    type: Null, // event object
    required: true,
  },
  status: {
    type: String, // status from react - would it go with eventObj?
    required: true,
  },
});

const UserEvents = mongoose.model("UserEvents", UserEventsSchema);

module.exports = UserEvents;
