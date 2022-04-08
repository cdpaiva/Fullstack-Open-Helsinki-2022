import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import ContactList from './components/ContactList'
import FilteredList from './components/FilteredList'
import Notification from './components/Notification'
import service from './services/notes'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    service
      .getAll()
      .then(res => {
        setPersons(res)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const person = persons.find(p => p.name === newName)
    if (person) {
      if(window.confirm(`${person.name} is already added to the phonebook. Replace the old number with a new one?`)){
        const updatedPerson = {
          ...person,
          number: newNumber,
        }
        service
          .update(updatedPerson.id, updatedPerson)        
          .then(setPersons(persons.map(p => p.name!==newName ? p : updatedPerson)))
          .catch(setPersons(persons.filter(p => p.id !== updatedPerson.id)))
      }
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    service
      .create(newPerson)
      .then(newPerson => setPersons(persons.concat(newPerson)))
      .then(setMessage('Contact added succesfully'))
    
    setTimeout(() => setMessage(''),3000)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)
    if(!person) {
      return
    }
    if(window.confirm(`Do you really want to delete ${person.name}?`)){
        service
        .remove(id)
        .then(setPersons(persons.filter(p => p.id !== id)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter
        query={query}
        handleQueryChange={handleQueryChange}
      />

      <h2>All contacts</h2>
      <ContactList persons={persons} handleDelete={handleDelete} />
      <h2>Filtered contacts</h2>
      <FilteredList
        persons={persons}
        query={query}
        handleDelete={handleDelete}
      />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addName={addName}
      />
    </div>
  )
}

export default App;
