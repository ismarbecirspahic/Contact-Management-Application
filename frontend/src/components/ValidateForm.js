const ValidateForm = (contact) => {
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
  } else if (!/^[+\d]{1,12}$/.test(contact.phone_number)) {
    errors.phone_number =
      "Phone Number must be a maximum of 12 digits and can only include '+' and numbers";
    isValid = false;
  }

  if (contact.categoryId === null) {
    errors.categoryId = "Please select a category";
    isValid = false;
  }

  return { isValid, errors };
};

export default ValidateForm;
