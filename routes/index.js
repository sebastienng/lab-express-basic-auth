const router = require("express").Router();
const usersRouter = require("./users.routes");
const authRouter = require("./auth.routes");
/* GET default route */
router.get("/", (req, res, next) => {
  res.json({ success: true });
});

router.use("/users", usersRouter);
router.use("/auth", authRouter);

module.exports = router;
