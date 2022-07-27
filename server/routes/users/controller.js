const express = require("express");
const router = express.Router();

const User = require("../../models/user");
const { hashcreator } = require("../security/hash");
const { hashcheck } = require("../security/hash");
const { tokencreator } = require("../security/token");

/* GET home page. */

const newUser = async (req, res) => {
  const hashpass = await hashcreator(req.body.password);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashpass,
  });
  const saved = await user.save();
  if (saved) {
    res.status(200).send("User Created successfully");
  } else {
    res.status(500).send({ error: "something Failed" });
  }
};

const loginUser = async (req, res) => {
  try {
    const exist = await User.findOne({ email: req.body.email });

    if (!exist) {
      res.status(404).send({ error: "user not found" });
    } else {
      const checkpass = await hashcheck(req.body.password, exist.password);
      if (checkpass) {
        const token = await tokencreator(exist.email);
        const respond = {
          token: token,
          user: exist.email,
        };
        res.cookie("jwt", token);
        res.cookie("uid", exist.email);
        res.status(200).send(respond);
      } else {
        res.status(401).send("Unauthorized user");
      }
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("uid");
  res.clearCookie("jwt");
  res.status(440).send("session expired");
};

module.exports = { loginUser, newUser, logoutUser };
