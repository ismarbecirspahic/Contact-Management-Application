import React from "react";

const ContactsActions = ({
  handleAddContact,
  handleShowDeletedContacts,
  deletedContacts,
  isDeleteModalOpen,
  handleRestoreContact,
  categories,
}) => {
  const getDeletedContactNameById = (deleteId) => {
    const deleteContact = categories.find((cat) => cat.id === deleteId);
    return deleteContact ? deleteContact.name : "";
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
      </div>

      {isDeleteModalOpen && deletedContacts.length !== 0 && (
        <div style={{ width: "80%" }}>
          <h2>Deleted Contacts</h2>
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
                <th>Category ID</th>
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
      )}
    </div>
  );
};

export default ContactsActions;
