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

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredContacts = contacts.filter((contact) => {
    const fullName = `${contact.firstName} ${contact.lastName}`;
    return (
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone_number.toString().includes(searchTerm)
    );
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    axios
      .get("http://localhost:3300/contacts")
      .then((response) => {
        setContacts(response.data);
      })
      .catch((error) => console.error("Error fetching contacts:", error));
  };

  const fetchDeletedContacts = () => {
    axios
      .get("http://localhost:3300/contacts/deleted")
      .then((response) => {
        setDeletedContacts(response.data);
      })
      .catch((error) =>
        console.error("Error fetching deleted contacts:", error)
      );
  };

  const handleShowDeletedContacts = () => {
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

  const handleSaveContact = async () => {
    await axios
      .post("http://localhost:3300/contacts", contact)
      .then((response) => {});
    fetchContacts();
    setIsModalOpen(false);
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

  const handleEditContact = async (contactId) => {
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
    <div>
      <h1>Contact List</h1>
      <ContactsSearch
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      <ContactsActions
        handleAddContact={handleAddContact}
        handleShowDeletedContacts={handleShowDeletedContacts}
      />
      <ContactsModal
        isModalOpen={isModalOpen}
        contact={contact}
        setContact={setContact}
        handleSaveContact={handleSaveContact}
        setIsModalOpen={setIsModalOpen}
      />
      <ContactsListDisplay
        filteredContacts={filteredContacts}
        handleUpdateContact={handleUpdateContact}
        handleDeleteContact={handleDeleteContact}
        deletedContacts={deletedContacts}
        handleRestoreContact={handleRestoreContact}
        isEditModalOpen={isEditModalOpen}
        editedContact={editedContact}
        setEditedContact={setEditedContact}
        handleEditContact={handleEditContact}
        setIsEditModalOpen={setIsEditModalOpen}
      />
    </div>
  );
};

export default ContactsList;
