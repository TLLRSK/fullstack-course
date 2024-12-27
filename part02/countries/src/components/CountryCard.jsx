const CountryCard = ({ data }) => {
    const { name, capital, area, languages, flags } = data;
    return (
        <div>
            <h2>{name.common}</h2>
            <div>
                <h3>capital</h3>
                <p>{capital[0]}</p>
            </div>
            <div>
                <h3>area</h3>
                <p>{area}</p>
            </div>
            <div>
                <h3>languages</h3>
                {Object.entries(languages).map(([code, key]) => (
                    <p key={code}>{key}</p>
                ))}
            </div>

            <picture>
                <img src={flags.png} alt={flags.alt} />
            </picture>
        </div>
    )
}

export default CountryCard;