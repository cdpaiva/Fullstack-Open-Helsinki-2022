import Person from "./Person"

const ContactList = ({persons, handleDelete}) => 
    persons.map(p =>
        <Person key={p.id} person={p} handleDelete={handleDelete}/> )

export default ContactList