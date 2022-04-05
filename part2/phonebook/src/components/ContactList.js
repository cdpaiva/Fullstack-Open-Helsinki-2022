const ContactList = ({persons}) => 
    persons.map(p => 
        <p key={p.id}>{p.name} {p.number} </p>)

export default ContactList