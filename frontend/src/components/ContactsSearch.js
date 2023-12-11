import React from "react";

const ContactsSearch = ({ searchTerm, handleSearchChange }) => {
  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search contacts..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          padding: "8px",
          fontSize: "16px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          width: "80%",
          maxWidth: "400px",
        }}
      />
    </div>
  );
};

export default ContactsSearch;
