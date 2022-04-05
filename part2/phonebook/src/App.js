import axios from 'axios'
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import ContactList from './components/ContactList'
import FilteredList from './components/FilteredList'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data)
      }
      )
  }, [])

  const addName = (event) => {
    event.preventDefault()
    if (persons.find(p => p.name === newName)) {
      window.alert(`${newName} is already added to the phonebook`)
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(newPerson))
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        query={query}
        handleQueryChange={handleQueryChange}
      />

      <h2>All contacts</h2>
      <ContactList persons={persons} />
      <h2>Filtered contacts</h2>
      <FilteredList
        persons={persons}
        query={query}
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
