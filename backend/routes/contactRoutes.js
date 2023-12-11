const express = require("express");
const contactController = require("../controllers/contactController");

const router = express.Router();

router.get("/", contactController.getAllContacts);
router.get("/deleted", contactController.getDeletedContacts);
router.get("/:id", contactController.getContactById);
router.post("/", contactController.addContact);
router.put("/:id", contactController.updateContact);
router.delete("/:id", contactController.deleteContact);
router.put("/restore/:id", contactController.restoreContact);

module.exports = router;
