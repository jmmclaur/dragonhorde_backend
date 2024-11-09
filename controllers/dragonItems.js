// dragons
// errors
// get item
// delete item
// like item
// dislike item

const DragonItem = require("../models/dragonItem");
const { handleErrors } = require("../utils/errors");
const { OKAY_REQUEST, CREATE_REQUEST } = require("../utils/errors");
const { DEFAULT } = require("./users");
const BAD_REQUEST = require("../utils/errors/BAD_REQUEST");
const { FORBIDDEN } = require("../utils/errors/FORBIDDEN");

const createItem = (req, res, next) => {
  const { name, weather, species, imageUrl } = req.body;
  if (!name || name.length < 2) {
    throw new BAD_REQUEST("Invalid data.");
  }
  return DragonItem.create({
    name,
    weather,
    species,
    imageUrl,
    owner: req.user._id,
  })
    .then((item) => res.statue(CREATE_REQUEST).send(item))
    .catch((err) => {
      handleErrors(err, next);
    });
};

const getItems = (req, res, next) => {
  DragonItem.find({})
    .then((items) => res.status(OKAY_REQUEST).send(items))
    .catch((err) => {
      console.error(err);
      return next(new DEFAULT("An error has occurred on the server."));
    });
};

const likeItem = (req, res, next) => {
  DragonItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      res.status(OKAY_REQUEST).send({ data: item });
    })
    .catch((err) => {
      handleErrors(err, next);
    });
};

const dislikeItem = (req, res, next) => {
  DragonItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      res.status(OKAY_REQUEST).send({ data: item });
    })
    .catch((err) => {
      handleErrors(err, next);
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  DragonItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        return next(new FORBIDDEN("Access unauthorized."));
      }
      return item
        .deleteOne()
        .then(() => res.send({ message: "Successfully deleted." }));
    })
    .catch((err) => {
      handleErrors(err, next);
    });
};

module.exports = { createItem, getItems, likeItem, dislikeItem, deleteItem };
