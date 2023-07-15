const { Recipe } = require("../models/recipes");
const { HttpError, ctrlWrapper } = require("../helpers");
const { Ingredient } = require("../models/ingredients");
const { Types, model } = require("mongoose");

const listContacts = async (req, res) => {
  const result = await Ingredient.aggregate([
    {
      $lookup: {
        from: "recipes",
        pipeline: [
          {
            $match: {
              ingredients: {
                $elemMatch: {
                  id: new Types.ObjectId("640c2dd963a319ea671e3668"),
                },
              },
            },
          },
          {
            $project: {
              recipes: {
                hhh: "$_id",
                title: "$title",
                // thumb: "$thumb",
                time: "$time",
              },
            },
          },
          {
            $replaceRoot: {
              newRoot: "$recipes",
            },
          },
        ],
        as: "aszxdc",
      },
    },
    {
      $match: {
        _id: new Types.ObjectId("640c2dd963a319ea671e3668"),
      },
    },
  ]);
  res.json(result);
};

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
