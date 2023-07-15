const { Recipe } = require("../models/recipes");
const { HttpError, ctrlWrapper } = require("../helpers");
const { Ingredient } = require("../models/ingredients");
const { Types, model } = require("mongoose");

const listContacts = async (req, res) => {
  const { search } = req.params;

  const result = await Recipe.aggregate([
    {
      $match: {
        title: { $regex: search, $options: "i" },
      },
    },
    {
      $group: {
        _id: null,
        list: {
          $push: "$$ROOT",
          // $push: {
          //   title: "$title",
          //   time: "$time",
          // },
        },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        // list: { $arrayElemAt: ["$list", 5] },
        // count: 1,
      },
    },
  ]);
  res.json(result[0]);
};

// $count: "recipe";
// const getContactById = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await Contact.findById(contactId);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

// const addContact = async (req, res) => {
//   const result = await Contact.create(req.body);
//   res.status(201).json(result);
// };

// const updateContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await Contact.findByIdAndUpdate(contactId, req.body, {
//     new: true,
//   });
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

// const updateFavorite = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await Contact.findByIdAndUpdate(contactId, req.body, {
//     new: true,
//   });
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// };

// const removeContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await Contact.findByIdAndRemove(contactId);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json({ message: "Contact deleted" });
// };

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  // getContactById: ctrlWrapper(getContactById),
  // addContact: ctrlWrapper(addContact),
  // updateContact: ctrlWrapper(updateContact),
  // updateFavorite: ctrlWrapper(updateFavorite),
  // removeContact: ctrlWrapper(removeContact),
};
