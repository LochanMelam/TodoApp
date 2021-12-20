const express = require("express");
const router = express.Router();

function loginCheck(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/signin");
  }
}

router.get("/:id/:route", loginCheck, async (req, res) => {
  console.log(req.params);
  TodoCollection.updateOne(
    { email: req.session.email, password: req.session.password },
    { $pull: { allTodos: { id: parseInt(req.params.id) } } },
    (err, result) => {
      res.redirect(`/${req.params.route}`);
    }
  );
});

module.exports = router;
