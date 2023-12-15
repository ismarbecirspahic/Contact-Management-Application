import axios from "axios";

export const fetchContacts = async () => {
  try {
    const response = await axios.get("http://localhost:3300/contacts");
    return response.data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

export const fetchDeletedContacts = async () => {
  try {
    const response = await axios.get("http://localhost:3300/contacts/deleted");
    return response.data;
  } catch (error) {
    console.error("Error fetching deleted contacts:", error);
    throw error;
  }
};

export const addContact = async (contact) => {
  try {
    await axios.post("http://localhost:3300/contacts", contact);
  } catch (error) {
    console.error("Error adding contact:", error.message);
    throw error;
  }
};

export const updateContact = async (contactId, editedContact) => {
  try {
    await axios.put(
      `http://localhost:3300/contacts/${contactId}`,
      editedContact
    );
  } catch (error) {
    console.error("Error updating a contact:", error);
    throw error;
  }
};

export const deleteContact = async (categoryId) => {
  try {
    await axios.delete(`http://localhost:3300/contacts/${categoryId}`);
  } catch (error) {
    console.error("Error deleting a contact:", error);
    throw error;
  }
};

export const deleteContacts = async () => {
  try {
    await axios.delete("http://localhost:3300/contacts");
  } catch (error) {
    console.error("Error deleting all contacts:", error);
    throw error;
  }
};
export const restoreContact = async (deletedCategoryId) => {
  try {
    await axios.put(
      `http://localhost:3300/contacts/restore/${deletedCategoryId}`
    );
  } catch (error) {
    console.error("Error restoring a contact:", error);
    throw error;
  }
};

export const restoreContacts = async () => {
  try {
    await axios.put(`http://localhost:3300/contacts`);
  } catch (error) {
    console.error("Error restoring all contacts:", error);
    throw error;
  }
};
