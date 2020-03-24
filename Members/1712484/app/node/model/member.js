const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
  name: { type: String, required: true },
  studentId: { type: String, required: true },
  email: { type: String, required: true },
  gitId: { type: String, required: true }
});

module.exports = mongoose.model("Member", memberSchema, "member");
