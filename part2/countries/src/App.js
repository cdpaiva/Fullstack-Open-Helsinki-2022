import axios from 'axios'
import { useState, useEffect } from 'react'

function App() {
  const URL = 'https://restcountries.com/v3.1/all'

  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios
      .get(URL)
      .then(res => setCountries(res.data))
  })

  const handleChange = (e) => {
    console.log('Called handleChange')
    setQuery(e.target.value) 
  }

  const filteredCountries = countries.filter(c => c.name.common.includes(query))
  
  return (
    <div>
      <h1>Fetch all countries from the {URL}</h1>
      <label htmlFor='searchCountry'></label>
      <input id='searchCountry' type='text' value={query} onChange={handleChange}/>
      <ul>
        <li>'Number of results: ',{filteredCountries.length})</li>
      </ul>
    </div>
  );
}

export default App;
