import './PersonForm.css';

const PersonForm = ({ newName, newNumber, handleNewName, handleNewNumber, addPerson }) => {
    
    return (
        <form onSubmit={addPerson} className='form--person'>
            <div>
                <label htmlFor="name">name</label>
                <input type="text" value={newName} name="name" onChange={handleNewName} />
            </div>
            <div>
                <label htmlFor="number">number</label>
                <input type="text" value={newNumber} name="number" onChange={handleNewNumber} />
            </div>
            <div>
                <button type="submit" className='btn--primary'>add person</button>
            </div>
        </form>
    )
}

export default PersonForm;