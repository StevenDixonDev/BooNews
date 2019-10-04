const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    match: /.+@.+\..+/,
    required: true
  },
  password: {
    type: String,
    match: /.{6,}/,
    required: true
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
