const client = require("../database");

class ContactModel {
  getAllContacts(callback) {
    client.query("SELECT * FROM contacts", (err, result) => {
      callback(err, result.rows);
    });
  }

  getContactById(id, callback) {
    client.query(
      `SELECT * FROM contacts WHERE contact_id=$1`,
      [id],
      (err, result) => {
        callback(err, result.rows);
      }
    );
  }

  addContact(contact, callback) {
    const query = `
      INSERT INTO contacts(name, email, phone_number, address, contact_group)
      VALUES($1, $2, $3, $4, $5)
      RETURNING contact_id;
    `;

    const values = [
      contact.name,
      contact.email,
      contact.phone_number,
      contact.address,
      contact.contact_group,
    ];

    client.query(query, values, (err, result) => {
      callback(err, result);
    });
  }

  updateContact(id, contact, callback) {
    const query = `
      UPDATE contacts
      SET name = $2, email = $3, phone_number = $4, address = $5, contact_group = $6
      WHERE contact_id = $1
    `;

    const values = [
      id,
      contact.name,
      contact.email,
      contact.phone_number,
      contact.address,
      contact.contact_group,
    ];

    client.query(query, values, (err, result) => {
      callback(err, result);
    });
  }

  deleteContact(id, callback) {
    client.query(
      `DELETE FROM contacts WHERE contact_id=$1`,
      [id],
      (err, result) => {
        callback(err, result);
      }
    );
  }
}

module.exports = new ContactModel();
