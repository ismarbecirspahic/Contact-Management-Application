import React from "react";
import { useState } from "react";
import ContactList from "./components/ContactList";
import CategoriesList from "./components/CategoriesList";
import ContactsSearch from "./components/ContactsSearch";
import axios from "axios";
import { useEffect } from "react";
import ContactsActions from "./components/ContactsActions";
import ContactsModal from "./components/ContactsModal";
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
    fetchContacts();
    fetchCategories();
    fetchDeletedContacts();
  }, []);
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3300/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchContacts = async () => {
    await axios
      .get("http://localhost:3300/contacts")
      .then((response) => {
        setContacts(response.data);
      })
      .catch((error) => console.error("Error fetching contacts:", error));
  };
  const fetchDeletedContacts = async () => {
    await axios
      .get("http://localhost:3300/contacts/deleted")
      .then((response) => {
        setDeletedContacts(response.data);
      })
      .catch((error) =>
        console.error("Error fetching deleted contacts:", error)
      );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleShowDeletedContacts = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
    fetchDeletedContacts();
  };
  const handleRestoreContact = async (deletedContactId) => {
    try {
      await axios.put(
        `http://localhost:3300/contacts/restore/${deletedContactId}`
      );
      fetchContacts();
      fetchDeletedContacts();
    } catch (error) {
      console.error("Error restoring contact:", error.message);
    }
  };
  const handleAddContact = () => {
    setContact({
      firstName: "",
      lastName: "",
      email: "",
      phone_number: "",
      address: "",
      categoryId: null,
    });
    setIsModalOpen(true);
  };
  const [validationErrors, setValidationErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone_number: "",
  });

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!contact.firstName.trim()) {
      errors.firstName = "First Name cannot be empty";
      isValid = false;
    } else if (!/^[A-Z][a-z]*$/.test(contact.firstName)) {
      errors.firstName =
        "First Name must start with a capital letter and contain only letters";
      isValid = false;
    }

    if (!contact.lastName.trim()) {
      errors.lastName = "Last Name cannot be empty";
      isValid = false;
    } else if (!/^[A-Z][a-z]*$/.test(contact.lastName)) {
      errors.lastName =
        "Last Name must start with a capital letter and contain only letters";
      isValid = false;
    }
    if (!contact.email.trim()) {
      errors.email = "Email cannot be empty";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(contact.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    if (!contact.phone_number.trim()) {
      errors.phone_number = "Phone Number is required";
      isValid = false;
    } else if (!/^\d{1,9}$/.test(contact.phone_number)) {
      errors.phone_number = "Phone Number must be a maximum of 9 digits";
      isValid = false;
    }
    if (contact.categoryId === null) {
      errors.categoryId = "Please select a category";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const getCategoryNameById = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "";
  };

  const filteredContacts = contacts.filter((contact) => {
    const fullName = `${contact.firstName} ${contact.lastName}`;
    const categoryName = getCategoryNameById(contact.categoryId);
    return (
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone_number.toString().includes(searchTerm) ||
      contact.address
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase() ||
            categoryName.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  });
  const handleSaveContact = async () => {
    if (validateForm()) {
      await axios.post("http://localhost:3300/contacts", contact);
      fetchContacts();

      setSelectedCategoryId("");
      setIsModalOpen(false);
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
        handleAddContact={handleAddContact}
        handleShowDeletedContacts={handleShowDeletedContacts}
        deletedContacts={deletedContacts}
        isDeleteModalOpen={isDeleteModalOpen}
        handleRestoreContact={handleRestoreContact}
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
          fetchDeletedContacts={fetchDeletedContacts}
          filteredContacts={filteredContacts}
          fetchContacts={fetchContacts}
          handleCategorySelect={handleCategorySelect}
          setIsCategorySelected={setIsCategorySelected}
          setSelectedCategoryId={setSelectedCategoryId}
          selectedCategoryId={selectedCategoryId}
          categories={categories}
          getCategoryNameById={getCategoryNameById}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
        <CategoriesList
          fetchContacts={fetchContacts}
          category={category}
          setCategory={setCategory}
        />
      </div>
    </div>
  );
};

export default App;
