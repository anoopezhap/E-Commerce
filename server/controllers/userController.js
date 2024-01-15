const User = require("./../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ type: "username already exist" });
    }

    //bcrypting the password hashing the password

    const hasedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hasedPassword });
    await newUser.save();

    res.json({ message: "user registered successfully" });
  } catch (err) {
    res.status(500).json({ type: err });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      res.status(400).json({ type: "no user found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(400).json({ type: "wrong credentials" });
      return;
    }

    const token = jwt.sign({ id: user._id }, "mysecret");

    res.json({ token, userId: user._id });
  } catch (err) {
    res.status(500).json({ type: err });
  }
};

exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    jwt.verify(authHeader, "mysecret", (err) => {
      if (err) {
        return res.status(403);
      }

      next();
    });
  }

  return res.status(401).json({ type: "Please login again to continue" });
};
