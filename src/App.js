import "./App.css";
import { useState } from "react";
import allContacts from "./contacts.json";

const firstFive = allContacts.slice(0, 5);

function App() {
  const [contacts, setContacts] = useState(firstFive);

  const addContact = () => {
    if (contacts.length === allContacts.length) {
      return;
    }
    const getContact =
      allContacts[Math.floor(Math.random() * allContacts.length)];
    console.log(getContact);

    const newContactId = getContact.id;
    let isContactRepeated = false;

    contacts.forEach((contact) => {
      if (contact.id === newContactId) {
        isContactRepeated = true;
      }
    });

    if (isContactRepeated === true) {
      addContact();
      return;
    }

    const updatedContacts = [...contacts, getContact];
    setContacts(updatedContacts);
  };

  const sortContactsByPopularity = () => {
    const sortContacts = [...contacts];
    sortContacts.sort((contact2, contact1) => {
      return contact1.popularity - contact2.popularity;
    });
    setContacts(sortContacts);
  };

  const sortContactsByName = () => {
    const sortContacts = [...contacts];
    sortContacts.sort((contact2, contact1) => {
      return contact2.name.localeCompare(contact1.name);
    });
    setContacts(sortContacts);
  };

  const removeContacts = (id) => {
    setContacts(
      contacts.filter((contact) => {
        if (contact.id === id) {
          return false;
        } else {
          return true;
        }
      })
    );
  };

  return (
    <div className="App">
      <h2>IronContacts</h2>
      <button onClick={addContact}>Add Random Contact</button>
      <button onClick={sortContactsByPopularity}>Sort by popularity</button>
      <button onClick={sortContactsByName}>Sort by name</button>
      <table className="table">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => {
            return (
              <tr key={contact.id}>
                <td>
                  <img src={contact.pictureUrl} alt="contact" width="100px" />
                </td>
                <td>{contact.name}</td>
                <td>{contact.popularity.toFixed(2)}</td>
                <td>{contact.wonOscar && "🏆"}</td>
                <td>{contact.wonEmmy && "🏆"}</td>
                <td>
                  <button onClick={() => removeContacts(contact.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
