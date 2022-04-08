const SearchResult = ({ countries, query, handleShow }) => {
    const filteredCountries = countries.filter(c => c.name.common.toLowerCase().includes(query.toLowerCase()))

    const displayCountries = () => {
        if (filteredCountries.length === countries.length) {
            return
        }
        if (filteredCountries.length === 1) {
            handleShow(filteredCountries[0])
        }
        if (filteredCountries.length > 10) {
            return <p>Too many matches, specify another filter</p>
        }
        if (filteredCountries.length <= 10) {
            return (filteredCountries.map(c =>
                <p key={c.cca2}>{c.name.common} <button onClick={() => handleShow(c)}>Show info</button></p>
            ))
        }
    }
    return (
        <div>
            {displayCountries()}
        </div>
    )
}

export default SearchResult