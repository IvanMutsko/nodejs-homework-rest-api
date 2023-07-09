const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { isValidId, validateBody, authenticate } = require("../../middlewars");
const { schemas } = require("../../models/contact");

router.get("/", authenticate, ctrl.listContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.put(
  "/:contactId",
  authenticate,
  validateBody(schemas.addSchema),
  isValidId,
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  isValidId,
  ctrl.updateFavorite
);

router.delete("/:contactId", authenticate, isValidId, ctrl.removeContact);

module.exports = router;
