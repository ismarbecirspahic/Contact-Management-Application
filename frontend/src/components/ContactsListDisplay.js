import React, { useEffect, useState } from "react";
import FilterContacts from "./FilterContacts";

import { deleteContacts } from "../services/ContactService";

const ContactsListDisplay = ({
  handleUpdateContact,
  handleDeleteContact,
  isEditModalOpen,
  editedContact,
  setEditedContact,
  handleEditContact,
  setIsEditModalOpen,
  validationErrors,
  setIsCategorySelected,
  setSelectedCategoryId,
  selectedCategoryId,
  categories,
  contacts,
  searchTerm,
  getCategoryNameById,
  fetchContacts,
  fetchDeletedContacts,
}) => {
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    const filtered = FilterContacts(contacts, searchTerm, getCategoryNameById);
    setFilteredContacts(filtered);
  }, [contacts, searchTerm, getCategoryNameById]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContacts = filteredContacts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const deleteAllContacts = async () => {
    try {
      await deleteContacts();
      fetchContacts();
      fetchDeletedContacts();
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const [sortOrder, setSortOrder] = useState("asc");

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setIsCategorySelected(true);
    setEditedContact({ ...editedContact, categoryId });
  };

  const handleSortChange = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  const sortedContacts = [...currentContacts].sort((a, b) => {
    const categoryA = getCategoryNameById(a.categoryId);
    const categoryB = getCategoryNameById(b.categoryId);

    if (sortOrder === "asc") {
      return categoryA.localeCompare(categoryB);
    } else {
      return categoryB.localeCompare(categoryA);
    }
  });

  return (
    <>
      <div>
        <button
          onClick={handleSortChange}
          style={{
            backgroundColor: "transparent",
            color: "#4CAF50",
            padding: "10px 15px",
            border: "none",
            cursor: "pointer",
            marginBottom: "5px",
            fontWeight: "bold",
          }}
        >
          Sort by Category ({sortOrder === "asc" ? "Ascending" : "Descending"})
        </button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={tableHeaderStyle}>
            <th style={{ padding: "30px", margin: "0 10px" }}>First Name</th>
            <th style={{ padding: "30px", margin: "0 10px" }}>Last Name</th>
            <th style={{ padding: "30px", margin: "0 10px" }}>Email</th>
            <th style={{ padding: "30px", margin: "0 10px" }}>Phone Number</th>
            <th style={{ padding: "30px", margin: "0 10px" }}>Address</th>
            <th style={{ padding: "30px", margin: "0 10px" }}>Category</th>
            <th style={{ padding: "30px", margin: "0 10px" }}>Actions</th>
          </tr>
        </thead>
        {sortedContacts.length !== 0 ? (
          <tbody>
            {sortedContacts.map((contact) => (
              <tr key={contact.id} style={tableRowStyle}>
                <td style={{ padding: "10px", margin: "0 10px" }}>
                  {contact.firstName}
                </td>
                <td style={{ padding: "10px", margin: "0 10px" }}>
                  {contact.lastName}
                </td>
                <td style={{ padding: "10px", margin: "0 10px" }}>
                  {contact.email}
                </td>
                <td style={{ padding: "10px", margin: "0 10px" }}>
                  {contact.phone_number}
                </td>
                <td style={{ padding: "10px", margin: "0 10px" }}>
                  {contact.address}
                </td>
                <td style={{ padding: "10px", margin: "0 10px" }}>
                  {getCategoryNameById(contact.categoryId)}
                </td>
                <td
                  style={{
                    display: "flex",
                    padding: "10px",
                    margin: "0 10px",
                  }}
                >
                  <div style={{ display: "flex", gap: "5px" }}>
                    <button
                      style={addButtonStyle}
                      onClick={() => handleUpdateContact(contact.id, contact)}
                    >
                      Edit
                    </button>
                    <button
                      style={deleteButtonStyle}
                      onClick={() => handleDeleteContact(contact.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr
              style={{
                borderBottom: "1px solid #ddd",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                padding: "10px 0",
              }}
            >
              <td
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                No contacts to be displayed
              </td>
            </tr>
          </tbody>
        )}
      </table>
      <div
        style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}
      >
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            style={{
              marginRight: "5px",
              padding: "5px 10px",
              backgroundColor: currentPage === index + 1 ? "#4CAF50" : "white",
              color: currentPage === index + 1 ? "white" : "#4CAF50",
              border: "2px solid #4CAF50",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        {sortedContacts.length !== 0 && (
          <button
            style={deleteButtonStyle}
            onClick={() => {
              deleteAllContacts();
            }}
          >
            Delete All
          </button>
        )}
      </div>

      {isEditModalOpen && (
        <div style={modal}>
          <div style={modalContent}>
            <span
              className="close"
              style={{
                color: "darkred",
                fontSize: "20px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => setIsEditModalOpen(false)}
            >
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
                  <h5 style={validationStyle}>{validationErrors.firstName}</h5>
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
                  <h5 style={validationStyle}>{validationErrors.lastName}</h5>
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
                  <h5 style={validationStyle}>{validationErrors.email}</h5>
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
                  <h5 style={validationStyle}>
                    {validationErrors.phone_number}
                  </h5>
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
                Category:
                <select
                  style={inputStyle}
                  onChange={(e) => handleCategorySelect(e.target.value)}
                  value={selectedCategoryId}
                >
                  <option value="" disabled hidden>
                    Select a category
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {validationErrors.category && (
                  <h5 style={validationStyle}>{validationErrors.category}</h5>
                )}
              </label>
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
            </form>
          </div>
        </div>
      )}
    </>
  );
};
const modal = {
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

const inputStyle = {
  padding: "8px",
  margin: "5px 0",
  borderRadius: "4px",
  width: "100%",
  border: "1px solid #ccc",
};

const tableHeaderStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  textAlign: "center",
};

const tableRowStyle = {
  borderBottom: "1px solid #ddd",
  textAlign: "center",
};

const validationStyle = {
  color: "red",
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
const deleteButtonStyle = {
  backgroundColor: "red",
  color: "white",
  padding: "10px 15px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default ContactsListDisplay;
