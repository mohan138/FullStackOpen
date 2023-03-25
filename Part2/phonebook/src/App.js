import phoneServices from './services/phoneServices';
import Note from './components/Note';
import { useState, useEffect } from 'react';



const App = () => {

  const [persons, setPersons] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    phoneServices.getAll().then(response => {
      setPersons(response);
    })
  }, []);

  const handelNameChange = (event) => {
    setName(event.target.value);
  }

  const handelNumberChange = (event) => {
    setNumber(event.target.value);
  }

  const addNote = (event) => {
    event.preventDefault();
    const entry = {
      name: name,
      number: number
    }

    if (persons.map(person => person.name).includes(entry.name)) {
      if (window.confirm(`${entry.name} is already added to phonebook, replace the old number with a new one?`)) {
        const separatedPerson = persons.find(person => person.name === entry.name);
        const updatedPerson = { ...separatedPerson, number: entry.number }
        phoneServices.update(separatedPerson.id, updatedPerson).then(response => {
          setPersons(persons.map(person => person.id !== separatedPerson.id ? person : response));
          setName("");
          setNumber("");
        });
      }
    }
    else {
      phoneServices.add(entry).then(response => {
        setPersons(persons.concat(response));
        setName("");
        setNumber("");
      })
    }
  }

  const search = (event) => {
    if (event.target.value.length > 0) {
      console.log()
      const filteredList = persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase()));
      setPersons(filteredList);
    }
    else {
      phoneServices.getAll().then(response => {
        setPersons(response);
      })
    }
  }

  const remove = (person) => {
    const id = person.id;
    if (window.confirm(`Delete ${person.name}?`)) {
      phoneServices.clear(id).then(() => setPersons(persons.filter(person => person.id !== id)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with<input onChange={search}></input>
      <h3>add a new</h3>
      <form onSubmit={addNote}>
        Name: <input value={name} onChange={handelNameChange} required></input>
        Number: <input value={number} onChange={handelNumberChange} required></input>
        <button type="submit">save</button>
      </form>
      <h3>Numbers</h3>
      {persons.map(person => <Note key={person.id} name={person.name} phone={person.number} remove={() => remove(person)} />)}
    </div >
  )
}

export default App
