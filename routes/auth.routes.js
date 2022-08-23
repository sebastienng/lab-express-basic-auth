const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jsonWebToken = require("jsonwebtoken");
const salt = 10;

router.post("/sign-up", async (req, res, next) => {
  const { username, password } = req.body;

  //checking if the body has all the info
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide a password and username." });
  }

  try {
    const findUserName = await User.findOne({ username });

    if (findUserName) {
      return res.status(400).json({ message: "Username already used." });
    }

    const generatedSalt = bcrypt.genSaltSync(salt);
    const hashedPassword = bcrypt.hashSync(password, generatedSalt);

    const newUser = await User.create({
      username: username,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.post("/sign-in", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide a password and username." });
  }
  try {
    const findUser = await User.findOne({ username });
    if (!findUser) {
      return res.status(400).json({ message: "User or Password wrong." });
    }

    //password validation
    const passwordCheck = bcrypt.compareSync(password, findUser.password);
    if (!passwordCheck) {
      return res.status(400).json({ message: "User or Password wrong." });
    }

    //Giving User
    const payload = { username };
    const token = jsonWebToken.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "1h",
    });

    res.status(200).json(token);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
