import React, { useState } from "react";

import ContactsListDisplay from "./ContactsListDisplay";
import { deleteContact, updateContact } from "../services/ContactService";
import ValidateForm from "./ValidateForm";

const ContactsList = ({
  fetchContacts,
  deletedContacts,
  fetchDeletedContacts,
  handleCategorySelect,
  setSelectedCategoryId,
  setIsCategorySelected,
  selectedCategoryId,
  categories,
  getCategoryNameById,
  contacts,
  searchTerm,
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
    const { isValid, errors } = ValidateForm(editedContact);
    if (isValid) {
      await updateContact(contactId, editedContact);
      setSelectedCategoryId("");
      fetchContacts();
      setIsEditModalOpen(false);
    } else {
      setValidationErrors(errors);
      console.log("Validation Errors:", errors);
    }
  };

  const handleDeleteContact = async (contactId) => {
    try {
      await deleteContact(contactId);
      fetchContacts();
      fetchDeletedContacts();
      setIsDeleteModalOpen(false);
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
        contacts={contacts}
        searchTerm={searchTerm}
        fetchContacts={fetchContacts}
        getCategoryNameById={getCategoryNameById}
        fetchDeletedContacts={fetchDeletedContacts}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
    </div>
  );
};

export default ContactsList;
