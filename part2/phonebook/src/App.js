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
      </div>)}
    </ul>
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
        <button onClick={props.addContact} type="submit">add</button>
      </div>
    </form>
  )
}



const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  
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
        }).catch(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }



  return (
    <div>
      <h2>Phonebook</h2>
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
