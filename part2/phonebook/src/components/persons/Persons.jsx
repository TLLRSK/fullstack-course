import './Persons.css';
const Persons = ({ persons, removePerson }) => {
    return (
        <ul className='list'>
            {persons.map((person, i) => {
                return (
                    <li key={person.id} className="card">
                        <div className="card__info">
                            <p className="card__info--name">{person.name}</p>
                            <p className="card__info--number">{person.number}</p>
                        </div>
                        <button onClick={() => removePerson(person)} className="btn--destructive">delete</button>
                    </li>
                )
            })}
        </ul>
    )
};

export default Persons;