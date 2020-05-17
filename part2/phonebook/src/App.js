import React, {useState, useEffect} from 'react';
import './App.css';
import personService from './services/persons'

const Contacts = ( { persons, deletePerson }) => {
  return (
    <ul>
      {persons.map(person =>
        <div key={person.name}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </div>
      )}
    </ul>
  )
}

const ContactForm = (props) => {
  return (
    //TODO jatka tehtävää 2.9 eli tee filter ominaisuus
    <div>
      <form onSubmit={props.filterContact}>
        <div>
          filter shown with
          <input
            value={props.filteringString}
            onChange={props.handleFilter}
          />
        </div>
      </form>
      <form onSubmit={props.addContact}>
        <div>
          name:
          <input
            value={props.newName}
            onChange={props.handleNameChange}
          />
        </div>
        <div>
          number: 
          <input
            value={props.newNumber}
            onChange={props.handleNumberChange}
          />
        </div>
        <div>
          <button onClick={props.addContact} type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Notification = (props) => {
  return (
    <div className="notification">
      {props.text}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ text, setText ] = useState('')
  const [showAll, setShowAll] = useState([  
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const flashNotification = (text) => {
    setText(text)
    setTimeout(setText, 3000, '')
  }
  
  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
  }, [])

  const newArray = persons.map(person => person.name)
  
  const addContact = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (!newArray.includes(personObject.name)) {
      
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          flashNotification(`Added ${newName} to the phonebook`)
        })
    }
    else {
      window.alert(`${newName} is already added to the phonebook`)
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const deletePerson = (id) => {
    const toDelete = persons.find(p => p.id === id)
    const ok = window.confirm(`Delete ${toDelete.name}`)
    if (ok) {
      personService.remove(id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
          flashNotification(`Deleted ${toDelete.name}`)
        }).catch(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const contactsToShow = showAll
    ? persons
    : persons.filter(person => person.con)

  return (
    <div>
      <h2>Phonebook</h2>
      {text.length > 0 &&
        <Notification text={text}/>
      }
      <ContactForm 
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
        newName={newName}
        addContact={addContact}
      />
      <h2>Numbers</h2>
      <Contacts persons={persons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App;
