import axios from 'axios'
import { useState, useEffect } from 'react'
import SearchResult from './components/SearchResults'
import CountryInfo from './components/CountryInfo'

function App() {
  const URL = 'https://restcountries.com/v3.1/all'

  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(undefined)

  const hook = () => {
    axios
      .get(URL)
      .then(res => {
        setCountries(res.data)
      })
  }

  //Initial GET to fetch the countries list
  useEffect(hook, [])

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  const handleShow = (country) => {
    setSelectedCountry(country)
  }

  return (
    <div>
      <h2>Countries Info</h2>
      <label htmlFor='searchCountry'>Search a country</label>
      <input id='searchCountry' type='text' value={query} onChange={handleChange} />

      <SearchResult countries={countries} query={query} handleShow={handleShow} />
      <CountryInfo country={selectedCountry} />

    </div>
  );
}

export default App;
