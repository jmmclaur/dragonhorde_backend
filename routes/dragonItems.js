// routers
// { auth }
// { validateCardBody, validateId }
// const { createItem, getItems, likeItem, dislikeItem, deleteItem}

const router = require("express").Router();
const { auth } = require("../middlewares/auth");
const { validateCardBody, validateId } = require("../middlewares/validation");
const {
  createItem,
  getItems,
  likeItem,
  dislikeItem,
  deleteItem,
} = require("../controllers/dragonItems");

router.post("/", auth, validateCardBody, createItem);
router.get("/", getItems);
router.delete("/:itemId", auth, validateId, deleteItem);
router.put("/:itemId/likes", auth, validateId, likeItem);
router.delete("/:itemId/likes", auth, validateId, dislikeItem);

module.exports = router;
