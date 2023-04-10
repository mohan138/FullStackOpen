import phoneServices from './services/phoneServices';
import Note from './components/Note';
import { useState, useEffect } from 'react';
import "./index.css";


const App = () => {

  const [persons, setPersons] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const [failMessageStatus, setFailMessageStatus] = useState(false);
  const [addedStatus, setAddedStatus] = useState(false);
  const [failMessage, setFailMessage] = useState("");

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

  const Added = ({ message }) => {
    if (addedStatus)
      return <div className='message'>Added {message}</div>
  }

  const Failed = ({ message }) => {
    if (failMessageStatus)
      return <div className='failMessage'>Information of {message} has already been removed</div>
  }

  const AddNote = (event) => {
    event.preventDefault();
    const entry = {
      Name: name,
      Phone: number
    }
    if (persons.map(person => person.Name).includes(entry.Name)) {
      if (window.confirm(`${entry.Name} is already added to phonebook, replace the old number with a new one?`)) {
        const separatedPerson = persons.find(person => person.Name === entry.Name);
        const updatedPerson = { ...separatedPerson, number: entry.Phone }
        phoneServices.update(separatedPerson.id, updatedPerson).then(response => {
          setPersons(persons.map(person => person.id !== separatedPerson.id ? person : response));
          setMessage(entry.Name);
          setName("");
          setNumber("");
          setAddedStatus(true);
          setTimeout(() => {
            setAddedStatus(false);
          }, 3000);
        }).catch(error => {
          console.log(error);
          setFailMessage(entry.Name);
          setFailMessageStatus(true);
          setTimeout(() => {
            setFailMessageStatus(false);
          }, 3000);
        });
      }
    }
    else {
      phoneServices.add(entry).then(response => {
        setPersons(persons.concat(response));
        console.log(persons);
        setMessage(name);
        setName("");
        setNumber("");
        setAddedStatus(true);

        setTimeout(() => {
          setAddedStatus(false);
        }, 3000);
      })
    }
  }

  const search = (event) => {
    if (event.target.value.length > 0) {
      console.log()
      const filteredList = persons.filter(person => person.Name.toLowerCase().includes(event.target.value.toLowerCase()));
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
    if (window.confirm(`Delete ${person.Name}?`)) {
      phoneServices.clear(id).then(() => setPersons(persons.filter(person => person.id !== id)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Failed message={failMessage} />
      <Added message={message} />
      filter shown with<input onChange={search}></input>
      <h3>add a new</h3>
      <form onSubmit={AddNote}>
        <div className='newInput'>
          <label htmlFor='name'>Name:</label>
          <input id="name" name='name' type={"text"} value={name} onChange={handelNameChange} required></input>
        </div>
        <div className='newInput'>
          <label htmlFor='number'>Number:</label>
          <input id="number" name='phone' type={"tel"} value={number} onChange={handelNumberChange} required></input>
        </div>
        <button type="submit">save</button>
      </form>
      <h3>Numbers</h3>
      {persons.map(person => <Note key={person.id} name={person.Name} phone={person.Phone} remove={() => remove(person)} />)}
    </div >
  )
}

export default App
