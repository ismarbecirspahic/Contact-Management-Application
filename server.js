const client = require("./database");
const express = require("express");
const bodyParser = require("body-parser");
const PORT = 3300;

const app = express();

app.use(bodyParser.json());

app.get("/contacts", (req, res) => {
  client.query("SELECT * FROM contacts", (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
  client.end;
});

app.get("/contacts/:id", (req, res) => {
  client.query(
    `SELECT * FROM contacts WHERE contact_id=${req.params.id}`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
      }
    }
  );
  client.end;
});

app.post("/contacts", (req, res) => {
  const contact = req.body;

  const query = `
    INSERT INTO contacts(contact_id, name, email, phone_number, address, contact_group)
    VALUES($1, $2, $3, $4, $5, $6)
  `;

  const values = [
    contact.contact_id,
    contact.name,
    contact.email,
    contact.phone_number,
    contact.address,
    contact.contact_group,
  ];

  client.query(query, values, (err, result) => {
    if (!err) {
      res.status(201).send("Addition was successful");
    } else {
      console.error("Error inserting contact:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
    client.end;
  });
});

app.put(`/contacts/:id`, (req, res) => {
  const contact = req.body;
  const contactId = req.params.id;

  const query = `
    UPDATE contacts
    SET name = $2, email = $3, phone_number = $4, address = $5, contact_group = $6
    WHERE contact_id = $1
  `;

  const values = [
    contactId,
    contact.name,
    contact.email,
    contact.phone_number,
    contact.address,
    contact.contact_group,
  ];

  client.query(query, values, (err, result) => {
    if (!err) {
      res.status(200).send("Update was successful");
    } else {
      console.error("Error updating the contact:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
    client.end;
  });
});

app.delete("/contacts/:id", (req, res) => {
  client.query(
    `DELETE FROM contacts WHERE contact_id=${req.params.id}`,
    (err, result) => {
      if (!err) {
        res.status(200).send("Deletion was successful");
      } else {
        console.error("Error deleting the contact:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
      }
      client.end;
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
client.connect();
