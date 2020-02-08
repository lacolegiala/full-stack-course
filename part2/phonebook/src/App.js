import React, {useState, useEffect} from 'react';
import './App.css';
import personService from './services/persons'

const Contacts = ( { persons }) => {

  return (
    <ul>
      {persons.map(person =>
      <div key={person.name}>{person.name}, {person.number}</div>)}
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

  // const hook = () => {
  //   console.log('effect')
  //   axios
  //     .get('http://localhost:3001/persons')
  //     .then(response => {
  //       console.log('promise fulfilled')
  //       setPersons(response.data)
  //     })
  // }
  
  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)
        })
  }, [])

  // personService
  //     .update(id, changedNote)
  //     .then(response => {
  //       setPersons(persons.map(person => person.id !== id ? person : response.data))
  //     })

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
      <Contacts persons={persons}/>
    </div>
  )

}
export default App;
