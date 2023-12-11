import React from "react";

const ContactsListDisplay = ({
  filteredContacts,
  handleUpdateContact,
  handleDeleteContact,
  deletedContacts,
  handleRestoreContact,
  isEditModalOpen,
  editedContact,
  setEditedContact,
  handleEditContact,
  setIsEditModalOpen,
}) => {
  return (
    <>
      <ul>
        {filteredContacts.map((contact) => (
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
      {deletedContacts.length > 0 && (
        <div>
          <h2>Deleted Contacts</h2>
          <ul>
            {deletedContacts.map((deletedContact) => (
              <li key={deletedContact.id}>
                {deletedContact.firstName} - {deletedContact.lastName} -{" "}
                {deletedContact.email} - {deletedContact.phone_number} -{" "}
                {deletedContact.address} - {deletedContact.contact_group}
                <button onClick={() => handleRestoreContact(deletedContact.id)}>
                  Restore
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
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
    </>
  );
};

export default ContactsListDisplay;
