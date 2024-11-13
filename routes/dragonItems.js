// routers
// { auth }
// { validateCardBody, validateId }
// const { createItem, getItems, likeItem, dislikeItem, deleteItem}

//New Attempt
const router = require("express").Router();
const { auth } = require("../middlewares/auth");
const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/dragonItems");
router.post("/", auth, createItem);
router.get("/", getItems);
router.delete("/:itemId", auth, deleteItem);
router.put("/:itemId/likes", auth, likeItem);
router.delete("/:itemId/likes", auth, dislikeItem);
module.exports = router;
