import React from "react";

const ContactsActions = ({ handleAddContact, handleShowDeletedContacts }) => {
  return (
    <div>
      <button onClick={handleAddContact}>Add</button>
      <button onClick={handleShowDeletedContacts}>Show Deleted Contacts</button>
    </div>
  );
};

export default ContactsActions;
