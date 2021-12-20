const express = require("express");
const router = express.Router();
TodoCollection = require("../models/schema");
router.post("/:route", async (req, res) => {
  var todo = {
    item: req.body.todoItem,
    id: Date.now(),
    active: true,
    complete: false,
  };
  TodoCollection.updateOne(
    { email: req.session.email, password: req.session.password },
    { $push: { allTodos: todo } },
    (err, result) => {
      res.redirect(`/${req.params.route}`);
    }
  );
});

module.exports = router;
