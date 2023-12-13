const { Contact } = require("../models");
const { Category } = require("../models");

const { Op } = require("sequelize");

class ContactController {
  async getAllContacts(req, res) {
    try {
      const contacts = await Contact.findAll();
      res.send(contacts);
    } catch (err) {
      console.error("Error getting contacts:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getContactById(req, res) {
    const contactId = req.params.id;

    try {
      const contact = await Contact.findByPk(contactId);
      if (contact) {
        res.send(contact);
      } else {
        res.status(404).json({ error: "Contact not found" });
      }
    } catch (err) {
      console.error("Error getting contact by ID:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async addContact(req, res) {
    const newContact = req.body;

    try {
      await Contact.create(newContact).then(() =>
        res.status(201).send("Addition was successful")
      );
    } catch (err) {
      console.error("Error inserting contact:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async updateContact(req, res) {
    let contactId = req.params.id;
    const updatedContact = req.body;

    try {
      await Contact.update(updatedContact, { where: { id: contactId } });
      res.status(200).send("Update was successful");
    } catch (err) {
      console.error("Error updating contact:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteContact(req, res) {
    const contactId = req.params.id;

    try {
      await Contact.destroy({ where: { id: contactId } });
      res.status(200).send("Deletion was successful");
    } catch (err) {
      console.error("Error deleting contact:", err.message);
    }
  }

  async restoreContact(req, res) {
    const contactId = req.params.id;
    try {
      await Contact.restore({ where: { id: contactId } });
      res.status(200).send("Contact restored successfully");
    } catch (err) {
      console.error("Error restoring a contact:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getDeletedContacts(req, res) {
    console.log(req.query);
    try {
      const deletedContacts = await Contact.findAll({
        where: {
          deletedAt: {
            [Op.not]: null,
          },
        },
        paranoid: false,
      });

      res.status(200).json(deletedContacts);
    } catch (error) {
      console.error("Error fetching deleted contacts:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new ContactController();
