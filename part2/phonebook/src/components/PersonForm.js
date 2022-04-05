const PersonForm = ({ newName, newNumber, addName, handleNameChange, handleNumberChange }) => {

    return (
        <>
            <h2>Add new contact</h2>
            <form>
                <div>
                    <label htmlFor="name">Name</label>
                    <input id='name' value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    <label htmlFor="number">Number</label>
                    <input id='number' value={newNumber} onChange={handleNumberChange} />
                </div>
            </form>
            <button type="submit" onClick={addName}>add</button>
        </>
    )
}

export default PersonForm