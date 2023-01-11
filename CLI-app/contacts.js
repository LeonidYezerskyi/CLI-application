const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const contactsJson = JSON.parse(contacts);
    return contactsJson;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const stringId = String(contactId);
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === stringId);
    return contact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const stringId = String(contactId);
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === stringId);
    contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return true;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: String(Date.now()), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
