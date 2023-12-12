import React from "react";
import { useState } from "react";
import ContactList from "./components/ContactList";
import CategoriesList from "./components/CategoriesList";
import ContactsSearch from "./components/ContactsSearch";
import axios from "axios";
import { useEffect } from "react";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState([]);

  const [category, setCategory] = useState({
    name: "",
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
  return (
    <div>
      <h1 style={{ textAlign: "center", color: "#333" }}>Contact List</h1>
      <ContactsSearch
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <ContactList
          filteredContacts={filteredContacts}
          fetchContacts={fetchContacts}
          category={category}
          setCategory={setCategory}
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
