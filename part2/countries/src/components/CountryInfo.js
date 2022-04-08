const CountryInfo = ({country}) => {
    if(!country) {
        return
    }
    return (
        <div>
            <hr />
            <h3>{country.name.common}</h3>
            <p>Capital: {country.capital[0]}</p>
            <p>Area: {country.area}</p>
            <h4>Languages:</h4>
            <ul>
                {
                    Object.entries(country.languages).map(([k, v]) =>
                        <li key={k}>{v}</li>)
                }
            </ul>
            <div style={{ fontSize: 128 }}>{country.flag}</div>
        </div>
    )
}

export default CountryInfo