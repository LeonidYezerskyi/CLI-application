import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./contacts.js";

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await getContactById(id);
      console.log(contact);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const deletedContact = await removeContact(id);
      console.log(deletedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const argvArr = hideBin(process.argv);
const args = yargs(argvArr).argv;

await invokeAction(args);
