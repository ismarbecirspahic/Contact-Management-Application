import React, { useState } from "react";
import axios from "axios";

import ContactsListDisplay from "./ContactsListDisplay";

const ContactsList = ({
  filteredContacts,
  fetchContacts,
  deletedContacts,
  fetchDeletedContacts,
  handleCategorySelect,
  setSelectedCategoryId,
  setIsCategorySelected,
  selectedCategoryId,
  categories,
  getCategoryNameById,
  setIsDeleteModalOpen,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [editedContact, setEditedContact] = useState({
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    phone_number: "",
    address: "",
    categoryId: null,
  });

  const [validationErrors, setValidationErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone_number: "",
  });

  const validateEditForm = () => {
    let isValid = true;
    const errors = {};

    if (!editedContact.firstName.trim()) {
      errors.firstName = "First Name cannot be empty";
      isValid = false;
    } else if (!/^[A-Z][a-z]*$/.test(editedContact.firstName)) {
      errors.firstName =
        "First Name must start with a capital letter and contain only letters";
      isValid = false;
    }

    if (!editedContact.lastName.trim()) {
      errors.lastName = "Last Name cannot be empty";
      isValid = false;
    } else if (!/^[A-Z][a-z]*$/.test(editedContact.lastName)) {
      errors.lastName =
        "Last Name must start with a capital letter and contain only letters";
      isValid = false;
    }
    if (!editedContact.email.trim()) {
      errors.email = "Email cannot be empty";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(editedContact.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    if (!editedContact.phone_number.trim()) {
      errors.phone_number = "Phone Number is required";
      isValid = false;
    } else if (!/^\d{1,9}$/.test(editedContact.phone_number)) {
      errors.phone_number = "Phone Number must be a maximum of 9 digits";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleUpdateContact = (contactId, contact) => {
    setIsEditModalOpen(true);
    setEditedContact({
      id: contactId,
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone_number: contact.phone_number,
      address: contact.address,
      categoryId: contact.categoryId,
    });
  };

  const handleEditContact = async (e, contactId) => {
    e.preventDefault();

    if (validateEditForm()) {
      try {
        await axios.put(
          `http://localhost:3300/contacts/${contactId}`,
          editedContact
        );
        setSelectedCategoryId("");

        fetchContacts();
        setIsEditModalOpen(false);
      } catch (error) {
        console.error("Error updating contact:", error.message);
      }
    }
  };

  const handleDeleteContact = async (contactId) => {
    try {
      await axios.delete(`http://localhost:3300/contacts/${contactId}`);
      fetchContacts();
      fetchDeletedContacts();
      setIsDeleteModalOpen(false);
      console.log(`Delete contact clicked for contact ID: ${contactId}`);
    } catch (err) {
      console.error("Error while deleting data", err.message);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <ContactsListDisplay
        filteredContacts={filteredContacts}
        handleUpdateContact={handleUpdateContact}
        handleDeleteContact={handleDeleteContact}
        deletedContacts={deletedContacts}
        isEditModalOpen={isEditModalOpen}
        editedContact={editedContact}
        setEditedContact={setEditedContact}
        handleEditContact={handleEditContact}
        setIsEditModalOpen={setIsEditModalOpen}
        validationErrors={validationErrors}
        handleCategorySelect={handleCategorySelect}
        setIsCategorySelected={setIsCategorySelected}
        setSelectedCategoryId={setSelectedCategoryId}
        selectedCategoryId={selectedCategoryId}
        categories={categories}
        fetchContacts={fetchContacts}
        getCategoryNameById={getCategoryNameById}
        fetchDeletedContacts={fetchDeletedContacts}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
    </div>
  );
};

export default ContactsList;
