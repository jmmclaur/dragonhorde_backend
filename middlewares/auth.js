// jwt
// errors
// auth
// module.exports = { auth };

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { NOT_AUTHORIZED } = require("../utils/errors/NOT_AUTHORIZED");

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return next(new NOT_AUTHORIZED("Authorization required."));
    }

    const token = authorization.replace("Bearer ", "");

    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;

    next();
    return "";
  } catch (err) {
    return next(new NOT_AUTHORIZED("Authorization required."));
  }
};

module.exports = {
  auth,
};
