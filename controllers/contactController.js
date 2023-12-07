const contactModel = require("../models/contactModel");

class ContactController {
  getAllContacts(req, res) {
    contactModel.getAllContacts((err, contacts) => {
      if (!err) {
        res.send(contacts);
      } else {
        console.error("Error getting contacts:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  }

  getContactById(req, res) {
    const contactId = req.params.id;

    contactModel.getContactById(contactId, (err, contact) => {
      if (!err) {
        res.send(contact);
      } else {
        console.error("Error getting contact by ID:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  }

  addContact(req, res) {
    const newContact = req.body;

    contactModel.addContact(newContact, (err, result) => {
      if (!err) {
        res
          .status(201)
          .send(
            `Addition was successful. New contact_id: ${result.rows[0].contact_id}`
          );
      } else {
        console.error("Error inserting contact:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  }

  updateContact(req, res) {
    const contactId = req.params.id;
    const updatedContact = req.body;

    contactModel.updateContact(contactId, updatedContact, (err, result) => {
      if (!err) {
        res.status(200).send("Update was successful");
      } else {
        console.error("Error updating contact:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  }

  deleteContact(req, res) {
    const contactId = req.params.id;

    contactModel.deleteContact(contactId, (err, result) => {
      if (!err) {
        res.status(200).send("Deletion was successful");
      } else {
        console.error("Error deleting contact:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  }
}

module.exports = new ContactController();
