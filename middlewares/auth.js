const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { NOT_AUTHORIZED } = require("../utils/errors");

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res
        .status(NOT_AUTHORIZED)
        .send({ message: "Authorization required" });
    }

    const token = authorization.replace("Bearer ", "");
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
    return "";
  } catch (err) {
    return res
      .status(NOT_AUTHORIZED)
      .send({ message: "Authorization required" });
  }
};
module.exports = {
  auth,
};
