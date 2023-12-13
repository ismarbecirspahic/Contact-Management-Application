import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const CategoriesList = ({ fetchContacts, category, setCategory }) => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setisEditModalOpen] = useState(false);
  const [editedcategory, setEditedcategory] = useState({
    id: null,
    name: "",
  });
  const [deletedCategories, setDeletedCategories] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  const handleAddCategory = () => {
    setCategory({
      name: "",
    });
    setIsModalOpen(!isModalOpen);
    setIsDeleteModalOpen(false);
    setisEditModalOpen(false);
  };

  const handleUpdateCategory = (categoryId, category) => {
    setisEditModalOpen(!isEditModalOpen);
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
    setEditedcategory({
      id: categoryId,
      name: category.name,
    });
  };

  const handleEditCategory = async (e, categoryId) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:3300/categories/${categoryId}`,
        editedcategory
      );
      fetchCategories();
      setisEditModalOpen(false);
      console.log(`Edit category clicked for category ID: ${categoryId}`);
    } catch (error) {
      console.error("Error updating category:", error.message);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:3300/categories/${categoryId}`);
      fetchCategories();
      setIsDeleteModalOpen(false);
      console.log(`Delete category clicked for category ID: ${categoryId}`);
    } catch (err) {
      console.error("Error while deleting data", err.message);
    }
  };

  const handleSaveCategory = async () => {
    await axios.post("http://localhost:3300/categories", category);
    fetchCategories();
    setIsModalOpen(false);
  };

  const fetchDeletedCategories = async () => {
    await axios
      .get("http://localhost:3300/categories/deleted")
      .then((response) => {
        setDeletedCategories(response.data);
      })
      .catch((error) =>
        console.error("Error fetching deleted categories:", error)
      );
  };

  const handleRestoreCategory = async (deletedCategoryId) => {
    try {
      await axios.put(
        `http://localhost:3300/categories/restore/${deletedCategoryId}`
      );
      fetchCategories();
      fetchDeletedCategories();
    } catch (error) {
      console.error("Error restoring contact:", error.message);
    }
  };

  const handleShowDeletedCategories = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
    setIsModalOpen(false);
    setisEditModalOpen(false);
    fetchDeletedCategories();
  };

  return (
    <div>
      <div style={categoryStyle}>
        <div
          style={{ textAlign: "center", overflowY: "auto", maxHeight: "300px" }}
        >
          <h2>Categories:</h2>
          {categories.map((category) => (
            <div key={category.id}>
              <p style={{ marginBottom: "5px" }}>{category.name}</p>
              {category.id !== 1 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  <button
                    style={editButtonStyle}
                    onClick={() => handleUpdateCategory(category.id, category)}
                  >
                    Edit
                  </button>
                  <button
                    style={deleteButtonStyle}
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={buttonContainerStyle}>
          {isEditModalOpen && (
            <div style={modalStyle}>
              <span
                className="close"
                style={{
                  color: "darkred",
                  fontSize: "20px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => setisEditModalOpen(false)}
              >
                &times;
              </span>

              <h2>Edit Category</h2>
              <form>
                <label>
                  Name:
                  <input
                    type="text"
                    value={editedcategory.name}
                    onChange={(e) =>
                      setEditedcategory({
                        ...editedcategory,
                        name: e.target.value,
                      })
                    }
                    style={inputStyle}
                  />
                </label>
                <button
                  style={updateButtonStyle}
                  onClick={(e) => handleEditCategory(e, editedcategory.id)}
                >
                  Update
                </button>
              </form>
            </div>
          )}
          <button
            type="button"
            style={addButtonStyle}
            onClick={handleAddCategory}
          >
            Add Category
          </button>

          <button
            type="button"
            style={showDeletedButtonStyle}
            onClick={handleShowDeletedCategories}
          >
            Show Deleted Contacts
          </button>
          {isDeleteModalOpen && deletedCategories.length !== 0 && (
            <div>
              <h2>Deleted Categories</h2>
              <ul style={deletedListStyle}>
                {deletedCategories.map((deletedCategory) => (
                  <li key={deletedCategory.id} style={deletedListItemStyle}>
                    {deletedCategory.name}
                    <button
                      style={addButtonStyle}
                      onClick={() => handleRestoreCategory(deletedCategory.id)}
                    >
                      Restore
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {isModalOpen && (
            <div style={modalStyle}>
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
              <h2>Add Category</h2>
              <form>
                <label>
                  Category name:
                  <input
                    style={inputStyle}
                    type="text"
                    value={category.name}
                    onChange={(e) =>
                      setCategory({ ...category, name: e.target.value })
                    }
                  />
                </label>
                <button
                  type="button"
                  onClick={handleSaveCategory}
                  style={saveButtonStyle}
                >
                  Save
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const categoryStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
};

const inputStyle = {
  padding: "8px",
  margin: "5px 0",
  width: "100%",
  boxSizing: "border-box",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const addButtonStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "10px 15px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginBottom: "10px",
};

const showDeletedButtonStyle = {
  backgroundColor: "white",
  color: "#4CAF50",
  padding: "10px 15px",
  border: "2px solid #4CAF50",
  borderRadius: "4px",
  cursor: "pointer",
};

const editButtonStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "4px",
};

const deleteButtonStyle = {
  backgroundColor: "red",
  color: "white",
  border: "none",
  borderRadius: "4px",
};

const updateButtonStyle = {
  backgroundColor: "white",
  color: "#4CAF50",
  padding: "10px 15px",
  border: "2px solid #4CAF50",
  borderRadius: "4px",
  cursor: "pointer",
};

const saveButtonStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "10px 15px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  width: "100%",
};

const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  zIndex: 1000,
};

const deletedListStyle = {
  overflowY: "auto",
  maxHeight: "150px",
  padding: 0,
  margin: 0,
  listStyleType: "none",
};

const deletedListItemStyle = {
  textAlign: "center",
  display: "flex",
  gap: "5px",
  justifyContent: "space-between",
  margin: "10px 0",
};

const buttonContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export default CategoriesList;
