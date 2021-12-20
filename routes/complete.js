const express = require("express");
const router = express.Router();

function loginCheck(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/signin");
  }
}

router.get("/", loginCheck, async (req, res) => {
  TodoCollection.find(
    { email: req.session.email, password: req.session.password },
    (err, result) => {
      var result = result[0];
      if (err) console.log(err);
      try {
        var data = [];
        for (var i = 0; i < result.allTodos.length; i++) {
          if (result.allTodos[i].complete) {
            data.push(result.allTodos[i]);
          }
        }
        res.render("home", { data: data, route: "/complete" });
      } catch (err) {
        console.log(err);
        res.render("home", { data: [], route: "/complete" });
      }
    }
  );
});

router.post("/:id/:route", (req, res) => {
  console.log(req.params);
  TodoCollection.find(
    { email: req.session.email, password: req.session.password },
    (err, result) => {
      updatedAllTodos = result[0].allTodos;
      for (var i = 0; i < updatedAllTodos.length; i++) {
        if (updatedAllTodos[i].id == req.params.id) {
          updatedAllTodos[i].active = !updatedAllTodos[i].active;
          updatedAllTodos[i].complete = !updatedAllTodos[i].complete;
        }
      }
      TodoCollection.findOneAndUpdate(
        { email: req.session.email, password: req.session.password },
        {
          $set: {
            allTodos: updatedAllTodos,
          },
        },
        (err, result) => {
          res.redirect(`/${req.params.route}`);
        }
      );
    }
  );
});

module.exports = router;
