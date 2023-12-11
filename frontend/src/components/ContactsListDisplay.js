import React from "react";

const ContactsListDisplay = ({
  filteredContacts,
  handleUpdateContact,
  handleDeleteContact,
  isEditModalOpen,
  editedContact,
  setEditedContact,
  handleEditContact,
  setIsEditModalOpen,
  validationErrors,
}) => {
  return (
    <>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={tableHeaderStyle}>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Contact Group</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.map((contact) => (
            <tr key={contact.id} style={tableRowStyle}>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td>{contact.phone_number}</td>
              <td>{contact.address}</td>
              <td>{contact.contact_group}</td>
              <td>
                <button
                  style={actionButtonStyle}
                  onClick={() => handleUpdateContact(contact.id, contact)}
                >
                  Edit
                </button>
                <button
                  style={actionButtonStyle}
                  onClick={() => handleDeleteContact(contact.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
                  style={inputStyle}
                />
                {validationErrors.firstName && (
                  <span className="error">{validationErrors.firstName}</span>
                )}
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
                  style={inputStyle}
                />
                {validationErrors.lastName && (
                  <span className="error">{validationErrors.lastName}</span>
                )}
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
                  style={inputStyle}
                />
                {validationErrors.email && (
                  <span className="error">{validationErrors.email}</span>
                )}
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
                  style={inputStyle}
                />
                {validationErrors.phone_number && (
                  <span className="error">{validationErrors.phone_number}</span>
                )}
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
                  style={inputStyle}
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
                  style={inputStyle}
                >
                  <option value="other">Other</option>
                  <option value="colleagues">Colleagues</option>
                  <option value="friends">Friends</option>
                  <option value="family">Family</option>
                </select>
                <button
                  style={{
                    backgroundColor: "white",
                    color: "#4CAF50",
                    padding: "10px 15px",
                    border: "2px solid #4CAF50",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    handleEditContact(e, editedContact.id);
                  }}
                >
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
const inputStyle = {
  padding: "8px",
  margin: "5px 0",
  width: "100%",
  boxSizing: "border-box",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const tableHeaderStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "20px",
  textAlign: "center",
};

const tableRowStyle = {
  borderBottom: "1px solid #ddd",
  padding: "8px",
  textAlign: "center",
};

const actionButtonStyle = {
  backgroundColor: "white",
  color: "#4CAF50",
  padding: "10px 15px",
  border: "2px solid #4CAF50",
  borderRadius: "4px",
  cursor: "pointer",
  marginRight: "5px",
};

export default ContactsListDisplay;
