const contactsOperations = require("./contacts");
const { table } = require("console");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const listAll = await contactsOperations.listContacts();
      table(listAll);
      break;

    case "get":
      const item = await contactsOperations.getContactById(id);
      if (!item) {
        throw new Error(`${id} not found`);
      }
      table(item);
      break;

    case "add":
      const newContact = await contactsOperations.addContact(
        name,
        email,
        phone
      );
      table(newContact);
      break;

    case "remove":
      const delCont = await contactsOperations.removeContact(id);
      if (!delCont) {
        throw new Error(`${id} not found`);
      }
      table(delCont);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
