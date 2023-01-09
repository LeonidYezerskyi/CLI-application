import * as fs from "fs/promises";

/*
 * Розкоментуйте і запиши значення
 * const contactsPath = ;
 */

// TODO: задокументувати кожну функцію
export const listContacts = async () => {
  const contactsJson = await fs.readFile("./db/contacts.json", "utf8");
  return JSON.parse(contactsJson);
};
// console.log(
//   await listContacts()
// );

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId);
};
// console.log(await getContactById("4"));

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  contacts.splice(index, 1);
  await fs.writeFile("./db/contacts.json", JSON.stringify(contacts));
  return true;
};
// console.log(await removeContact("3"));

export const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  contacts.push({ name, email, phone });
  await fs.writeFile("./db/contacts.json", JSON.stringify(contacts));
  return { name, email, phone };
};
// console.log(await addContact("Leo Yez", "leo@gmail.com", "(098) 989-0122"));
