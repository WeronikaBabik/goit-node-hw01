const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const list = JSON.parse(data);
    return list;
  } catch (e) {
    console.log(e.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const searchContact = contacts.find(({ id }) => id === contactId);
    return searchContact;
  } catch (e) {
    console.log(e.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const newContacts = contacts.filter(({ id }) => id !== contactId);
    saveData(newContacts);
    return contacts;
  } catch (e) {
    console.log(e.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = { id: nanoid(), name: name, email: email, phone: phone };
    const contacts = await listContacts();
    const newContacts = [...contacts, newContact];
    saveData(newContacts);
    return contacts;
  } catch (e) {
    console.log(e.message);
  }
}

function saveData(data) {
  try {
    fs.writeFile(contactsPath, JSON.stringify(data, null, 1));
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  saveData,
};
