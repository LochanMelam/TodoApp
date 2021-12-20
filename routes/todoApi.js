const express = require("express");
const router = express.Router();
TodoCollection = require("../models/schema");

router.get("/todoItems/:id", async (req, res) => {
  TodoCollection.find(
    { email: req.session.email, password: req.session.password },
    (err, result) => {
      var result = result[0];
      if (err) console.log(err);
      try {
        var data = [];
        for (var i = 0; i < result.allTodos.length; i++) {
          if (result.allTodos[i].active && req.params.id == "Active") {
            data.push(result.allTodos[i]);
          } else if (
            result.allTodos[i].complete &&
            req.params.id == "Complete"
          ) {
            data.push(result.allTodos[i]);
          } else if (req.params.id != "Active" && req.params.id != "Complete") {
            data.push(result.allTodos[i]);
          }
        }
        console.log(data);
        res.send(data);
      } catch (err) {
        console.log(err);
        res.send([]);
      }
    }
  );
});

router.post("/todoItems", async (req, res) => {
  console.log(req.body);
  var todo = {
    item: req.body.item + ` ${Date()}`,
    active: false,
    complete: false,
  };
  TodoCollection.updateOne(
    { email: req.session.email, password: req.session.password },
    { $push: { allTodos: todo } },
    (err, result) => {
      console.log(result);
    }
  );
});

router.put("/todoItems", async (req, res) => {
  console.log(req.body);
  todoCollection.updateOne(
    { email: req.session.email, password: req.session.password },
    { $pull: { allTodos: { item: req.body.item } } },
    (err, result) => {
      console.log(result);
    }
  );
});

module.exports = router;
