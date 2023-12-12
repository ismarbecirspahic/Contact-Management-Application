import CategoriesSelector from "./CategoriesSelector";
const ContactsModal = ({
  isModalOpen,
  contact,
  setContact,
  handleSaveContact,
  setIsModalOpen,
  validationErrors,
  category,
  setCategory,
  selectedCategoryId,
  handleCategorySelect,
  isCategorySelected,
}) => {
  return (
    <>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              style={{
                color: "darkred",
                fontSize: "20px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </span>
            <h2>Add Contact</h2>
            <form>
              <label>
                First name:
                <input
                  type="text"
                  value={contact.firstName}
                  onChange={(e) =>
                    setContact({ ...contact, firstName: e.target.value })
                  }
                  style={inputStyle}
                />
                {validationErrors.firstName && (
                  <span style={error} className="error">
                    {validationErrors.firstName}
                  </span>
                )}
              </label>
              <label>
                Last name:
                <input
                  type="text"
                  value={contact.lastName}
                  onChange={(e) =>
                    setContact({ ...contact, lastName: e.target.value })
                  }
                  style={inputStyle}
                />
                {validationErrors.lastName && (
                  <span style={error} className="error">
                    {validationErrors.lastName}
                  </span>
                )}
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) =>
                    setContact({ ...contact, email: e.target.value })
                  }
                  style={inputStyle}
                />
                {validationErrors.email && (
                  <span style={error} className="error">
                    {validationErrors.email}
                  </span>
                )}
              </label>
              <label>
                Phone Number:
                <input
                  type="text"
                  value={contact.phone_number}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      phone_number: e.target.value,
                    })
                  }
                  style={inputStyle}
                />
                {validationErrors.phone_number && (
                  <span style={error} className="error">
                    {validationErrors.phone_number}
                  </span>
                )}
              </label>
              <label>
                Address:
                <input
                  type="text"
                  value={contact.address}
                  onChange={(e) =>
                    setContact({ ...contact, address: e.target.value })
                  }
                  style={inputStyle}
                />
              </label>
              <CategoriesSelector
                onSelectCategory={handleCategorySelect}
                selectedCategory={selectedCategoryId}
                validationErrors={validationErrors}
              />
              {!isCategorySelected && (
                <span className="error">Please select a category.</span>
              )}

              <button
                type="button"
                onClick={handleSaveContact}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  padding: "10px 15px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Save Contact
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

const error = {
  color: "red",
  fontWeight: "bold",
};
export default ContactsModal;
