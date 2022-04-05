const Filter = ({ query, handleQueryChange }) =>
    (<div className='box'>
        <h2 className='subtitle has-text-centered'>Search for a contact</h2>
        <label className='label' htmlFor="search"> Filter by name</label>
        <input className='input is-secondary' value={query} onChange={handleQueryChange} id="search" />
    </div>)

export default Filter