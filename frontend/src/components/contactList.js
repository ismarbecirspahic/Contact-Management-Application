import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone_number: "",
    address: "",
    contact_group: "",
  });
  const [editedContact, setEditedContact] = useState({
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    phone_number: "",
    address: "",
    contact_group: "other",
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    axios
      .get("http://localhost:3300/contacts")
      .then((response) => {
        setContacts(response.data);
      })
      .catch((error) => console.error("Error fetching contacts:", error));
  };

  const handleAddContact = () => {
    setContact({
      firstName: "",
      lastName: "",
      email: "",
      phone_number: "",
      address: "",
      contact_group: "other",
    });
    setIsModalOpen(true);
  };

  const handleSaveContact = async () => {
    await axios
      .post("http://localhost:3300/contacts", contact)
      .then((response) => {});
    fetchContacts();
    setIsModalOpen(false);
  };

  const handleUpdateContact = (contactId, contact) => {
    setIsEditModalOpen(true);
    setEditedContact({
      id: contactId,
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone_number: contact.phone_number,
      address: contact.address,
      contact_group: contact.contact_group,
    });
  };

  const handleEditContact = async (contactId) => {
    try {
      await axios.put(
        `http://localhost:3300/contacts/${contactId}`,
        editedContact
      );
      fetchContacts();
      setIsEditModalOpen(false);

      console.log(`Edit contact clicked for contact ID: ${contactId}`);
    } catch (error) {
      console.error("Error updating contact:", error.message);
    }
  };

  const handleDeleteContact = async (contactId) => {
    try {
      await axios.delete(`http://localhost:3300/contacts/${contactId}`);
      fetchContacts();
      console.log(`Delete contact clicked for contact ID: ${contactId}`);
    } catch (err) {
      console.error("Error while deleting data", err.message);
    }
  };

  return (
    <div>
      <h1>Contact List</h1>

      <button onClick={handleAddContact}>Add</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <h2>Add Contact</h2>
            <form>
              <label>
                First name:
                <input
                  type="text"
                  value={contact.firstName}
                  onChange={(e) =>
                    setContact({ ...contact, firstName: e.target.value })
                  }
                />
              </label>
              <label>
                Last name:
                <input
                  type="text"
                  value={contact.lastName}
                  onChange={(e) =>
                    setContact({ ...contact, lastName: e.target.value })
                  }
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) =>
                    setContact({ ...contact, email: e.target.value })
                  }
                />
              </label>
              <label>
                Phone Number:
                <input
                  type="text"
                  value={contact.phone_number}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      phone_number: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Address:
                <input
                  type="text"
                  value={contact.address}
                  onChange={(e) =>
                    setContact({ ...contact, address: e.target.value })
                  }
                />
              </label>
              <label>
                Contact Group:
                <select
                  value={contact.contact_group}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      contact_group: e.target.value,
                    })
                  }
                >
                  <option value="other">Other</option>
                  <option value="colleagues">Colleagues</option>
                  <option value="friends">Friends</option>
                  <option value="family">Family</option>
                </select>
              </label>

              <button type="button" onClick={handleSaveContact}>
                Save
              </button>
            </form>
          </div>
        </div>
      )}

      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.firstName} - {contact.lastName} - {contact.email} -{" "}
            {contact.phone_number} - {contact.address} - {contact.contact_group}
            <button onClick={() => handleUpdateContact(contact.id, contact)}>
              Edit
            </button>
            <button onClick={() => handleDeleteContact(contact.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      {isEditModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsEditModalOpen(false)}>
              &times;
            </span>
            <h2>Edit Contact</h2>
            <form>
              <label>
                First name:
                <input
                  type="text"
                  value={editedContact.firstName}
                  onChange={(e) =>
                    setEditedContact({
                      ...editedContact,
                      firstName: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Last name:
                <input
                  type="text"
                  value={editedContact.lastName}
                  onChange={(e) =>
                    setEditedContact({
                      ...editedContact,
                      lastName: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={editedContact.email}
                  onChange={(e) =>
                    setEditedContact({
                      ...editedContact,
                      email: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Phone Number:
                <input
                  type="number"
                  value={editedContact.phone_number}
                  onChange={(e) =>
                    setEditedContact({
                      ...editedContact,
                      phone_number: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Address:
                <input
                  type="text"
                  value={editedContact.address}
                  onChange={(e) =>
                    setEditedContact({
                      ...editedContact,
                      address: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Contact Group:
                <select
                  value={editedContact.contact_group}
                  onChange={(e) =>
                    setEditedContact({
                      ...editedContact,
                      contact_group: e.target.value,
                    })
                  }
                >
                  <option value="other">Other</option>
                  <option value="colleagues">Colleagues</option>
                  <option value="friends">Friends</option>
                  <option value="family">Family</option>
                </select>
                <button onClick={() => handleEditContact(editedContact.id)}>
                  Update
                </button>
              </label>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsList;
