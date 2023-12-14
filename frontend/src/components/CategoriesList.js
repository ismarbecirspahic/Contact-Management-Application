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

  const deleteAllCategories = async () => {
    try {
      await axios.delete("http://localhost:3300/categories");

      setIsDeleteModalOpen(false);
      fetchCategories();
      fetchDeletedCategories();
    } catch (error) {
      console.error("Error deleting all categories:", error);
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
    } catch (error) {
      console.error("Error updating category:", error.message);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:3300/categories/${categoryId}`);
      fetchCategories();
      setIsDeleteModalOpen(false);
      fetchDeletedCategories();
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
    try {
      const response = await axios.get(
        "http://localhost:3300/categories/deleted"
      );
      setDeletedCategories(response.data);
    } catch (error) {
      console.error("Error fetching deleted categories:", error);
    }
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

  const restoreAllCategories = async () => {
    try {
      await axios.put("http://localhost:3300/categories");
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
          <h2
            style={{
              color: "#4CAF50",
              padding: "15px",
              backgroundColor: "white",
              border: "2px solid #4CAF50",
              margin: "0px",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            Categories
          </h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={tableHeaderStyle}>
                <th style={{ padding: "30px", margin: "0 10px" }}>
                  Category name
                </th>
                <th style={{ padding: "30px", margin: "0 10px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr
                  style={{
                    borderBottom: "1px solid rgb(221, 221, 221)",
                  }}
                  key={category.id}
                >
                  <td style={{ padding: "20px 15px" }}>{category.name}</td>
                  {category.id !== 1 && (
                    <td
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                        padding: "15px 15px",
                      }}
                    >
                      <button
                        style={editButtonStyle}
                        onClick={() =>
                          handleUpdateCategory(category.id, category)
                        }
                      >
                        Edit
                      </button>
                      <button
                        style={deleteButtonStyle}
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
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
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
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
              Show Deleted Categories
            </button>

            {categories.length !== 1 ? (
              <button
                type="button"
                style={deleteButtonStyle}
                onClick={() => deleteAllCategories()}
              >
                Delete All Categories
              </button>
            ) : (
              <button
                style={addButtonStyle}
                onClick={() => restoreAllCategories()}
              >
                Restore All Categories
              </button>
            )}
          </div>
          {isDeleteModalOpen && deletedCategories.length !== 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h2>Deleted Categories</h2>
              <ul style={deletedListStyle}>
                {deletedCategories.map((deletedCategory) => (
                  <li key={deletedCategory.id} style={deletedListItemStyle}>
                    {deletedCategory.name}
                    <button
                      style={{
                        backgroundColor: "white",
                        color: "#4CAF50",
                        padding: "5px 10px",
                        border: "2px solid #4CAF50",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleRestoreCategory(deletedCategory.id)}
                    >
                      Restore
                    </button>
                  </li>
                ))}
              </ul>
              <button
                style={addButtonStyle}
                onClick={() => restoreAllCategories()}
              >
                Restore All Categories
              </button>
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
  fontWeight: "bold",
};

const showDeletedButtonStyle = {
  fontWeight: "bold",
  backgroundColor: "white",
  color: "red",
  padding: "10px 15px",
  border: "2px solid red",
  borderRadius: "4px",
  cursor: "pointer",
};

const editButtonStyle = {
  fontWeight: "bold",
  backgroundColor: "#4CAF50",
  padding: "10px 15px",

  color: "white",
  border: "none",
  borderRadius: "4px",
};

const deleteButtonStyle = {
  backgroundColor: "red",
  padding: "10px 15px",

  color: "white",
  fontWeight: "bold",
  border: "none",
  borderRadius: "4px",
};

const updateButtonStyle = {
  fontWeight: "bold",
  backgroundColor: "white",
  color: "#4CAF50",
  padding: "10px 15px",
  border: "2px solid #4CAF50",
  borderRadius: "4px",
  cursor: "pointer",
};

const saveButtonStyle = {
  fontWeight: "bold",
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
  display: "flex",
  gap: "10px",
  justifyContent: "space-between",
  margin: "10px 0",
  alignItems: "center",
};

const buttonContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
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

export default CategoriesList;
