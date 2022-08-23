const jsonWebToken = require("jsonwebtoken");
const User = require("../models/User.model");

const isAllowed = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(400).json({ message: "No token found!" });
  }

  token = token.replace("Bearer ", "");
  const userToken = jsonWebToken.verify(token, process.env.TOKEN_SECRET);
  console.log(userToken);
  try {
    const user = await User.findOne({ username: userToken.username });
    if (!user) {
      return res.status(400).json({ message: "mais qui es tu" });
    }
    req.user = user;
  } catch (error) {
    return res.status(401).json({ message: "Tu n'a pas le droit d'etre ici" });
  }
  // Once everything went well, go to the next middleware
  next();
};

module.exports = isAllowed;
