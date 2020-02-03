import React, {useState} from 'react';
import './App.css';

const App = () => {
  const [ persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '12345790'
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const newArray = persons.map(person => person.name)
  
  const addContact = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    
      if (!newArray.includes(personObject.name)) {
      console.log(persons)
      console.log(personObject.name)
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
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
      <form onSubmit={addContact}>
        <div>
          name:
          <input
           value={newName}
           onChange={handleNameChange}
          />
        </div>
        <div>
          number: 
          <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button onClick={addContact} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
        <div key={person.name}>{person.name}, {person.number}</div>)}
      </ul>
    </div>
  )

}
export default App;
