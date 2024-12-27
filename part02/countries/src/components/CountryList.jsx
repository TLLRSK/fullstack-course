const CountryList = ({ data, selectCountry }) => {
    const countries = data.map(country => country.name.common)
    return (
        <ul>{
            countries.map((country, i) => {
                return (
                    <li key={i}>
                        <h3>{country}</h3>
                        <button onClick={() => selectCountry(country)}>Show</button>
                    </li>
                )
            })
        }</ul>
    )
}

export default CountryList;