import Person from "./Person"

const FilteredList = ({ persons, query, handleDelete }) => {
    if(!query) {
        return <p>Insert a name in the search box</p>
    }
    return persons
        .filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()))
        .map(p =>
            <Person key={p.id} person={p} handleDelete={handleDelete}/>
        )
    }
export default FilteredList