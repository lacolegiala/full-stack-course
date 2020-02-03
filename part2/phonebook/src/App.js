import React, {useState} from 'react';
import './App.css';

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const newArray = persons.map(person => person.name)
  
  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const nameObject = {
      name: newName,
    }
    
      if (!newArray.includes(nameObject.name)) {
      console.log(persons)
      console.log(nameObject.name)
      setPersons(persons.concat(nameObject))
      setNewName('')
      }
      else {
        window.alert(`${newName} is already added to the phonebook`)
      }
    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name:
          <input
           value={newName}
           onChange={handleNameChange}
          />
        </div>
        <div>
          <button onClick={addName} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <div key={person.name}>{person.name}</div>)}
      </ul>
    </div>
  )

}
export default App;
