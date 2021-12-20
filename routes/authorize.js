const express = require("express");
var router = express.Router();
var model = require("../models/schema");

//get route
router.get("/:id", (req, res) => {
  model.updateOne(
    { _id: req.params.id },
    { $set: { verified: true } },
    (err, user) => {
      console.log(user);
      if (err) {
        console.log(err);
      } else {
        res.redirect("/signin");
      }
    }
  );
});

module.exports = router;
