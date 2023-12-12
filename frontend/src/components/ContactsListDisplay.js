import React, { useEffect, useState } from "react";
import axios from "axios";

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
  const [categories, setCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3300/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getCategoryNameById = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "";
  };

  const handleSortChange = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  const sortedContacts = [...filteredContacts].sort((a, b) => {
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
        <button onClick={handleSortChange}>
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
        <tbody>
          {sortedContacts.map((contact) => (
            <tr key={contact.id} style={tableRowStyle}>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td>{contact.phone_number}</td>
              <td>{contact.address}</td>
              <td>{getCategoryNameById(contact.categoryId)}</td>
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
                Category
                <select
                  value={editedContact.categoryId}
                  onChange={(e) =>
                    setEditedContact({
                      ...editedContact,
                      categoryId: e.target.value,
                    })
                  }
                  style={inputStyle}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
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
  textAlign: "center",
};

const tableRowStyle = {
  borderBottom: "1px solid #ddd",
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
