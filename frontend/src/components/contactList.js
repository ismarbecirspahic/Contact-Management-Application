import React, { useState, useEffect } from "react";
import axios from "axios";

import ContactsListDisplay from "./ContactsListDisplay";
import ContactsModal from "./ContactsModal";
import ContactsSearch from "./ContactsSearch";
import ContactsActions from "./ContactsActions";

const ContactsList = () => {
  const [contacts, setContacts] = useState([]);
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
    contact_group: "",
  });
  const [editedContact, setEditedContact] = useState({
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    phone_number: "",
    address: "",
    contact_group: "other",
  });

  const [validationErrors, setValidationErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone_number: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredContacts = contacts.filter((contact) => {
    const fullName = `${contact.firstName} ${contact.lastName}`;
    return (
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone_number.toString().includes(searchTerm) ||
      contact.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  useEffect(() => {
    fetchContacts();
  }, []);

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

  const handleShowDeletedContacts = () => {
    setIsDeleteModalOpen(true);
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
      contact_group: "other",
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
      contact_group: contact.contact_group,
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
        maxWidth: "800px",
        margin: "auto",
        padding: "20px",
      }}
    >
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
