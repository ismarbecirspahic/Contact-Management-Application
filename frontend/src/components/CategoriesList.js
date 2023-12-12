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
  };
  const handleUpdateCategory = (categoryId, category) => {
    setisEditModalOpen(!isEditModalOpen);
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
    fetchDeletedCategories();
  };

  return (
    <div>
      <div style={categoryStyle}>
        <div style={{ textAlign: "center" }}>
          Categories:
          {categories.map((category) => (
            <div>
              <p key={category.id} value={category.id}>
                {category.name}
              </p>
              {category.name !== "Other" && (
                <div>
                  <button
                    onClick={() => handleUpdateCategory(category.id, category)}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDeleteCategory(category.id)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {isEditModalOpen && (
            <div className="modal">
              <div className="modal-content">
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
                    style={{
                      backgroundColor: "white",
                      color: "#4CAF50",
                      padding: "10px 15px",
                      border: "2px solid #4CAF50",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    onClick={(e) => {
                      handleEditCategory(e, editedcategory.id);
                    }}
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          )}
          <button
            type="button"
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px 15px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginBottom: "10px",
            }}
            onClick={handleAddCategory}
          >
            Add Category
          </button>

          <button
            type="button"
            style={{
              backgroundColor: "white",
              color: "#4CAF50",
              padding: "10px 15px",
              border: "2px solid #4CAF50",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={handleShowDeletedCategories}
          >
            Show Deleted Contacts
          </button>
          {isDeleteModalOpen && (
            <div>
              <h2>Deleted Categories</h2>
              <ul>
                {deletedCategories.map((deletedCategory) => (
                  <li key={deletedCategory.id}>
                    {deletedCategory.name}
                    <button
                      style={{
                        backgroundColor: "white",
                        color: "#4CAF50",
                        padding: "10px 15px",
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
            </div>
          )}

          {isModalOpen && (
            <div>
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
                  style={{
                    backgroundColor: "#4CAF50",
                    color: "white",
                    padding: "10px 15px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    width: "100%",
                  }}
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

export default CategoriesList;
