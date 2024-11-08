// router
// userRouter
// not found error
// itemRouter
const router = require("express").Router();

const userRouter = require("./users");

const { NOT_FOUND } = require("../utils/errors/NOT_FOUND");

const itemRouter = require("./dragons");

router.use("/dragons", itemRouter);
router.use("/users", userRouter);

router.use(() => {
  throw new NOT_FOUND("Resource not found");
});

module.exports = router;
