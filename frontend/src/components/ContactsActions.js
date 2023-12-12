import React from "react";

const ContactsActions = ({
  handleAddContact,
  handleShowDeletedContacts,
  deletedContacts,
  isDeleteModalOpen,
  handleRestoreContact,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
      }}
    >
      <button
        type="button"
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={handleAddContact}
      >
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
          }}
          onClick={handleShowDeletedContacts}
        >
          Show Deleted Contacts
        </button>
      )}

      {isDeleteModalOpen && deletedContacts.length !== 0 && (
        <div>
          <h2>Deleted Contacts</h2>
          <ul>
            {deletedContacts.map((deletedContact) => (
              <li key={deletedContact.id}>
                {deletedContact.firstName} - {deletedContact.lastName} -{" "}
                {deletedContact.email} - {deletedContact.phone_number} -{" "}
                {deletedContact.address} - {deletedContact.categoryId}
                <button
                  style={{
                    backgroundColor: "white",
                    color: "#4CAF50",
                    padding: "10px 15px",
                    border: "2px solid #4CAF50",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleRestoreContact(deletedContact.id)}
                >
                  Restore
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ContactsActions;
