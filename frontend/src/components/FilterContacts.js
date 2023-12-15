const FilterContacts = (contacts, searchTerm, getCategoryNameById) => {
  return contacts.filter((contact) => {
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
};

export default FilterContacts;
