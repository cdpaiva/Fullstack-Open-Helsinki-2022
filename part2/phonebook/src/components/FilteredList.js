const FilteredList = ({ persons, query }) => {
    if(!query) {
        return <p>Insert a name in the search box</p>
    }
    return persons
        .filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()))
        .map(p =>
            (<p key={p.id}>{p.name}, {p.number}</p>)
        )
    }
export default FilteredList