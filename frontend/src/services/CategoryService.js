import axios from "axios";

const BASE_URL = "http://localhost:3300/categories";

export const fetchCategories = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const addCategory = async (category) => {
  try {
    await axios.post(BASE_URL, category);
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};

export const updateCategory = async (categoryId, editedCategory) => {
  try {
    await axios.put(`${BASE_URL}/${categoryId}`, editedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    await axios.delete(`${BASE_URL}/${categoryId}`);
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

export const deleteAllCategories = async () => {
  try {
    await axios.delete(BASE_URL);
  } catch (error) {
    console.error("Error deleting all categories:", error);
    throw error;
  }
};

export const fetchDeletedCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/deleted`);
    return response.data;
  } catch (error) {
    console.error("Error fetching deleted categories:", error);
    throw error;
  }
};

export const restoreCategory = async (deletedCategoryId) => {
  try {
    await axios.put(`${BASE_URL}/restore/${deletedCategoryId}`);
  } catch (error) {
    console.error("Error restoring category:", error);
    throw error;
  }
};

export const restoreAllCategories = async () => {
  try {
    await axios.put(`${BASE_URL}`);
  } catch (error) {
    console.error("Error restoring all categories:", error);
    throw error;
  }
};
