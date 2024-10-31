// bcrypt
// jwt
// User
// errors

// createUser
// login
// getCurrentUser
// modifyUserData

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");
const { BAD_REQUEST } = require("../utils/errors/BAD_REQUEST");
const { NOT_AUTHORIZED } = require("../utils/errors/NOT_AUTHORIZED");
const {
  OKAY_REQUEST,
  CREATE_REQUEST,
  handleErrors,
} = require("../utils/errors");

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) =>
      res.status(CREATE_REQUEST).send({
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      })
    )
    .catch((err) => {
      handleErrors(err, next);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BAD_REQUEST("Invalid data.");
  }

  User.findOne({ email })
    .select("+password")
    .then(async (user) => {
      if (!user) {
        throw new NOT_AUTHORIZED("Not Authorized.");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new NOT_AUTHORIZED("Not Authorized.");
      }
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(OKAY_REQUEST).send({
        token,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        _id: user._id,
      });
    })
    .catch((err) => handleErrors(err, next));
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(OKAY_REQUEST).send(user))
    .catch((err) => {
      handleErrors(err, next);
    });
};

const modifyUserData = async (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, avatar: req.body.avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      handleErrors(err, next);
    });
};

module.exports = { createUser, login, getCurrentUser, modifyUserData };
