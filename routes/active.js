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
          if (result.allTodos[i].active) {
            data.push(result.allTodos[i]);
          }
        }
        res.render("home", { data: data, route: "/active" });
      } catch (err) {
        console.log(err);
        res.render("home", { data: [], route: "/active" });
      }
    }
  );
});

module.exports = router;
