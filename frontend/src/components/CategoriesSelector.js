import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoriesSelector = ({
  onSelectCategory,
  selectedCategory,
  validationErrors,
}) => {
  const [categories, setCategories] = useState([]);

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
  return (
    <div>
      <label>
        Category:
        <select
          style={inputStyle}
          onChange={(e) => onSelectCategory(e.target.value)}
          value={selectedCategory}
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
          <span className="error">{validationErrors.category}</span>
        )}
      </label>
    </div>
  );
};

const inputStyle = {
  padding: "8px",
  margin: "5px 0",
  borderRadius: "4px",
  width: "100%",
  border: "1px solid #ccc",
};

export default CategoriesSelector;
