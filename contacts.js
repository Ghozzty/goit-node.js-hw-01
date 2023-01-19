const fs = require("fs").promises;

const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
  const dataString = await fs.readFile(contactsPath);
  const data = JSON.parse(dataString);
  return data;
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();

  const reqCont = allContacts.find((cont) => cont.id === contactId);
  if (!reqCont) {
    return null;
  }
  return reqCont;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();

  const index = allContacts.findIndex((cont) => cont.id === contactId);

  if (index === -1) {
    return null;
  }

  const deletedContact = allContacts[index];

  allContacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts));

  return deletedContact;
};

const addContact = async (name, email, phone) => {
  const newCont = { name, email, phone, id: uuidv4() };

  const allContacts = await listContacts();

  allContacts.push(newCont);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts));

  return newCont;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
