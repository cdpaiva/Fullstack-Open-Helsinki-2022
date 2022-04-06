const Person = ({ person, handleDelete }) =>
    <>
        <p>{person.name} {person.number}</p>
        <button onClick={() => handleDelete(person.id)}>Delete</button>
    </>

export default Person