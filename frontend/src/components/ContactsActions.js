import axios from "axios";
import React from "react";

const ContactsActions = ({
  handleAddContact,
  handleShowDeletedContacts,
  deletedContacts,
  isDeleteModalOpen,
  handleRestoreContact,
  categories,
  setIsDeleteModalOpen,
  fetchContacts,
  fetchDeletedContacts,
}) => {
  const getDeletedContactNameById = (deleteId) => {
    const deleteContact = categories.find((cat) => cat.id === deleteId);
    return deleteContact ? deleteContact.name : "";
  };

  const restoreAllContacts = async () => {
    try {
      await axios.put("http://localhost:3300/contacts");
      fetchContacts();
      setIsDeleteModalOpen(false);
      fetchDeletedContacts();
    } catch (error) {
      console.error("Error restoring contacts:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        <button type="button" style={addButtonStyle} onClick={handleAddContact}>
          Add Contact
        </button>
        {deletedContacts.length !== 0 && (
          <button
            type="button"
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "10px 15px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={handleShowDeletedContacts}
          >
            Show Deleted Contacts
          </button>
        )}
      </div>

      {isDeleteModalOpen && deletedContacts.length !== 0 && (
        <div style={modalStyle}>
          <div style={modalContent}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "4rem",
              }}
            >
              <span
                className="close"
                style={{
                  color: "darkred",
                  fontSize: "20px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  position: "sticky",
                }}
                onClick={() => setIsDeleteModalOpen(false)}
              >
                &times;
              </span>

              <h2 style={{ margin: "0px", textAlign: "center" }}>
                Deleted Contacts
              </h2>
              <button
                style={addButtonStyle}
                onClick={() => {
                  restoreAllContacts();
                }}
              >
                Restore All Contacts
              </button>
            </div>
            <table
              style={{
                width: "100%",
                marginTop: "10px",
              }}
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th>Category Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {deletedContacts.map((deletedContact) => (
                  <tr
                    key={deletedContact.id}
                    style={{ borderBottom: "1px solid #ddd" }}
                  >
                    <td
                      style={{ textAlign: "center" }}
                    >{`${deletedContact.firstName} ${deletedContact.lastName}`}</td>
                    <td style={{ textAlign: "center" }}>
                      {deletedContact.email}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {deletedContact.phone_number}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {deletedContact.address}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {getDeletedContactNameById(deletedContact.categoryId)}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        style={{
                          backgroundColor: "white",
                          color: "#4CAF50",
                          padding: "5px 10px",
                          border: "2px solid #4CAF50",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleRestoreContact(deletedContact.id)}
                      >
                        Restore
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const modalStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
};
const modalContent = {
  backgroundColor: "#fefefe",
  padding: "20px",
  borderRadius: "8px",
  width: "80%",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const addButtonStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "10px 15px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default ContactsActions;
