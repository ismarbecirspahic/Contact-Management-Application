import React from "react";

const ContactsSearch = ({ searchTerm, handleSearchChange }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <input
        type="text"
        placeholder="Search contacts..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default ContactsSearch;
