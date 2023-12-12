import React, { useState, useEffect } from "react";
import axios from "axios";

import ContactsListDisplay from "./ContactsListDisplay";
import ContactsModal from "./ContactsModal";
import ContactsActions from "./ContactsActions";

const ContactsList = ({
  filteredContacts,
  fetchContacts,
  category,
  setCategory,
}) => {
  const [deletedContacts, setDeletedContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone_number: "",
    address: "",
    categoryId: null,
  });
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
  const handleSaveContact = async () => {
    if (validateForm()) {
      await axios.post("http://localhost:3300/contacts", contact);
      fetchContacts();
      setIsModalOpen(false);
    }
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
        fetchContacts();
        setIsEditModalOpen(false);
        console.log(`Edit contact clicked for contact ID: ${contactId}`);
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
      />
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
      />
    </div>
  );
};

export default ContactsList;
