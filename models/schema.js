const mongoose = require("mongoose");
var todoItemSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  verified: false,
  allTodos: [],
});
module.exports = mongoose.model("todoItem", todoItemSchema);
