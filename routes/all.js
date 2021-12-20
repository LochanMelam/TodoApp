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
        data = result.allTodos;
        res.render("home", { data: data, route: "/all" });
      } catch (err) {
        console.log(err);
        res.render("home", { data: [], route: "/all" });
      }
    }
  );
});
module.exports = router;
