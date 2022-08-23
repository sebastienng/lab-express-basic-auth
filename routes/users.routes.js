const router = require("express").Router();
const User = require("../models/User.model");
const isAllowed = require("../middleware/middleware");

router.get("/", async (req, res) => {
  const getUsers = await User.find();
  res.json({ getUsers });
});

router.get("/main", isAllowed, (req, res) => {
  //code
  res.json({ message: "My cat picture" });
});

router.get("/private", isAllowed, (req, res) => {
  //code
  res.json({ message: "My gif picture" });
});
module.exports = router;
