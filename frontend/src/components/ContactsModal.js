const ContactsModal = ({
  isModalOpen,
  contact,
  setContact,
  handleSaveContact,
  setIsModalOpen,
}) => {
  return (
    <>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <h2>Add Contact</h2>
            <form>
              <label>
                First name:
                <input
                  type="text"
                  value={contact.firstName}
                  onChange={(e) =>
                    setContact({ ...contact, firstName: e.target.value })
                  }
                />
              </label>
              <label>
                Last name:
                <input
                  type="text"
                  value={contact.lastName}
                  onChange={(e) =>
                    setContact({ ...contact, lastName: e.target.value })
                  }
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) =>
                    setContact({ ...contact, email: e.target.value })
                  }
                />
              </label>
              <label>
                Phone Number:
                <input
                  type="text"
                  value={contact.phone_number}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      phone_number: e.target.value,
                    })
                  }
                />
              </label>
              <label>
                Address:
                <input
                  type="text"
                  value={contact.address}
                  onChange={(e) =>
                    setContact({ ...contact, address: e.target.value })
                  }
                />
              </label>
              <label>
                Contact Group:
                <select
                  value={contact.contact_group}
                  onChange={(e) =>
                    setContact({
                      ...contact,
                      contact_group: e.target.value,
                    })
                  }
                >
                  <option value="other">Other</option>
                  <option value="colleagues">Colleagues</option>
                  <option value="friends">Friends</option>
                  <option value="family">Family</option>
                </select>
              </label>

              <button type="button" onClick={handleSaveContact}>
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default ContactsModal;
