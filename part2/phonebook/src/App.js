import React, {useState, useEffect} from 'react';
import './App.css';
import personService from './services/persons'

const Contacts = (props) => {
  return (
    <ul>
      {props.persons.map(person =>
        <div key={person.name}>
          {person.name} {person.number}
          <button onClick={() => props.deletePerson(person.id)}>delete</button>
        </div>
      )}
    </ul>
  )
}

const Filter = (props) => {
  return (
    <div>
      filter shown with
      <input
        value={props.filteringString}
        onChange={props.handleFilter}
      />
    </div>
  )
}

const ContactForm = (props) => {
  return (
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
        <button type="submit">add</button>
      </div>
    </form>
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
  const [ query, setQuery ] = useState('')

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

  
  
  const addContact = (event) => {
    // defaulttina selaimet lataavat koko sivun uudelleen, preventDefaultilla estetään se
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    
    const personNames = persons.map(person => person.name)

    if (!personNames.includes(personObject.name)) {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          flashNotification(`Added ${newName} to the phonebook`)
        })
    }
    else {
      const contact = persons.find(person => person.name === newName)
      const changedContact = {...contact, number: newNumber}
      const ok = window.confirm(`${newName} is already added to the phonebook. Replace the old number with new one?`)
      if (ok) {
        personService.update(contact.id, changedContact)
        .then(response => {
          setPersons(persons.map(person => person.id !== contact.id ? person : response))
        })
        .catch(error => {
          console.log('fail', error)
          alert('Something went wrong, try again later')
        })
      }
    }
    setNewName('')
    setNewNumber('')
  }

    


  const handleFilter = (event) => {
    setQuery(event.target.value)
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

  const contactsToShow = query === ''
    ? persons
    : persons.filter(person =>
      person.name.toLowerCase().includes(query)
    )



  return (
    <div>
      <h2>Phonebook</h2>
      {text.length > 0 &&
        <Notification text={text}/>
      }
      <Filter filteringString={query} handleFilter={handleFilter}></Filter>
      <ContactForm 
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
        newName={newName}
        addContact={addContact}
      />
      <h2>Numbers</h2>
      <Contacts persons={contactsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App;
