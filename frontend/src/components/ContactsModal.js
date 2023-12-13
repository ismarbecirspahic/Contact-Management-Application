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
                  <h5 style={error}>{validationErrors.firstName}</h5>
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
                  <h5 style={error}>{validationErrors.lastName}</h5>
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
                  <h5 style={error}>{validationErrors.email}</h5>
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
                  <h5 style={error}>{validationErrors.phone_number}</h5>
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
                <h5 style={error}>Please select a category.</h5>
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

const error = {
  color: "red",
  fontWeight: "bold",
};
export default ContactsModal;
