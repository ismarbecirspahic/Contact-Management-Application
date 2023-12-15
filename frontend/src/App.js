import React from "react";
import { useState } from "react";
import ContactList from "./components/ContactList";
import CategoriesList from "./components/CategoriesList";
import ContactsSearch from "./components/ContactsSearch";
import { useEffect } from "react";
import ContactsActions from "./components/ContactsActions";
import ContactsModal from "./components/ContactsModal";
import { fetchCategories } from "./services/CategoryService";
import ValidateForm from "./components/ValidateForm";

import {
  fetchContacts,
  fetchDeletedContacts,
  addContact,
} from "./services/ContactService";
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone_number: "",
    address: "",
    categoryId: null,
  });
  const [deletedContacts, setDeletedContacts] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({
    name: "",
  });
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [isCategorySelected, setIsCategorySelected] = useState(true);

  const handleCategorySelect = (categoryId) => {
    setContact({ ...contact, categoryId });
    setSelectedCategoryId(categoryId);
    setIsCategorySelected(true);
  };

  useEffect(() => {
    fetchAllCategories();
    fetchAllContacts();
    fetchAllDeletedContacts();
  }, []);
  const fetchAllCategories = async () => {
    try {
      const response = await fetchCategories();
      setCategories(response);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchAllContacts = async () => {
    try {
      const response = await fetchContacts();
      setContacts(response);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };
  const fetchAllDeletedContacts = async () => {
    try {
      const response = await fetchDeletedContacts();
      setDeletedContacts(response);
    } catch (err) {
      console.error("Error fetching deleted contacts:", err);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const [validationErrors, setValidationErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone_number: "",
  });

  const getCategoryNameById = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "";
  };
  const handleSaveContact = async () => {
    const { isValid, errors } = ValidateForm(contact);

    if (isValid) {
      await addContact(contact);
      fetchAllContacts();

      setSelectedCategoryId("");
      setIsModalOpen(false);
    } else {
      setValidationErrors(errors);
      console.log("Validation Errors:", errors);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", color: "#333" }}>Contact List</h1>
      <ContactsSearch
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      <ContactsActions
        setContact={setContact}
        setIsModalOpen={setIsModalOpen}
        deletedContacts={deletedContacts}
        isDeleteModalOpen={isDeleteModalOpen}
        categories={categories}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        fetchContacts={fetchAllContacts}
        fetchDeletedContacts={fetchAllDeletedContacts}
      />

      <ContactsModal
        isModalOpen={isModalOpen}
        contact={contact}
        setContact={setContact}
        handleSaveContact={handleSaveContact}
        setIsModalOpen={setIsModalOpen}
        validationErrors={validationErrors}
        category={category}
        setCategory={setCategory}
        handleCategorySelect={handleCategorySelect}
        selectedCategoryId={selectedCategoryId}
        isCategorySelected={isCategorySelected}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <ContactList
          deletedContacts={deletedContacts}
          fetchDeletedContacts={fetchAllDeletedContacts}
          fetchContacts={fetchAllContacts}
          handleCategorySelect={handleCategorySelect}
          setIsCategorySelected={setIsCategorySelected}
          setSelectedCategoryId={setSelectedCategoryId}
          selectedCategoryId={selectedCategoryId}
          categories={categories}
          contacts={contacts}
          searchTerm={searchTerm}
          getCategoryNameById={getCategoryNameById}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
        <CategoriesList category={category} setCategory={setCategory} />
      </div>
    </div>
  );
};

export default App;
