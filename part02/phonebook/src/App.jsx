import { useEffect, useState } from 'react'
import './App.css'
import PersonFilter from './components/filter/PersonFilter'
import PersonForm from './components/form/PersonForm'
import Persons from './components/persons/Persons'
import personService from './services/persons'
import Notification from './components/notification/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [notification, setNotification] = useState(null);

  const getPersons = async () => {
    const data = await personService.getAll();
    setPersons(data);
  }

  const showNotification = ({ message, type }) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 6000)
  }

  // Form
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const handleNewName = (e) => {
    e.preventDefault();
    setNewName(e.target.value)
  }
  const handleNewNumber = (e) => {
    e.preventDefault();
    setNewNumber(e.target.value)
  }
  const resetForm = () => {
    setNewName("");
    setNewNumber("");
  }

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };

    const existingPerson = persons.find((person) => person.name === newPerson.name);

    if (existingPerson) {
      if (existingPerson.number === newPerson.number) {
        alert(`Name must be unique`);
      } else {
        const updatedPerson = { ...existingPerson, number: newPerson.number };
        updatePerson(updatedPerson);
      }
      return;
    }

    personService
      .create(newPerson)
      .then((data) => {
        setPersons(persons.concat(data));
        showNotification({
          message: `${newPerson.name} has been added to the list`,
          type: 'default'
        });
      })
      .catch((error) => {
        showNotification({
          message: `Error adding ${newPerson.name}: ${error.response?.data?.error || error.message}`,
          type: 'error'
        });
      });

    resetForm();
  };

  const removePerson = (removedPerson) => {
    if (window.confirm(`Do you want to remove ${removedPerson.name} from the list?`)) {
      const id = removedPerson.id;

      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          showNotification({
            message: `${removedPerson.name} has been removed from list`,
            type: 'default'
          });
        })
        .catch((error) => {
          showNotification({
            message: `Error removing ${removedPerson.name}: ${error.response?.data?.error || error.message}`,
            type: 'error'
          });
        });
    }
  };

  const updatePerson = (updatedPerson) => {
    if (window.confirm(`${updatedPerson.name} is already listed. Do you want to update the phone number?`)) {
      personService
        .update(updatedPerson)
        .then((data) => {
          setPersons(
            persons.map((person) =>
              person.id === updatedPerson.id ? data : person
            )
          );
          showNotification({
            message: `${updatedPerson.name}'s number has been updated`,
            error: 'default'
          });
        })
        .catch((error) => {
          showNotification({
            message: `Error updating ${updatedPerson.name}: ${error.response?.data?.error || error.message}`,
            type: 'error'
          });
        });
    }
  };

  // Filter
  const [filter, setFilter] = useState('');

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const filteredPersons = filter.length > 0
    ? persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  persons.filter((person) => person.name.toLowerCase().includes(filter))

  useEffect(() => {
    getPersons();
  }, [])

  return (
    <>
      <header className='header'>
        <h2>Phonebook</h2>
        <PersonFilter filter={filter} handleFilter={handleFilter} />
      </header>

      <section className='section'>
        <aside className='aside'>
          <Notification notification={notification} />
          <PersonForm
            newName={newName}
            newNumber={newNumber}
            addPerson={addPerson}
            handleNewName={handleNewName}
            handleNewNumber={handleNewNumber}
          />
        </aside>

        <article className='article'>
          <h2>Listed</h2>
          {persons.length > 0 ? (
            <Persons persons={filteredPersons} removePerson={removePerson} />
          ) : (
            <p>No users found</p>
          )}
        </article>
      </section>
    </>
  )
}

export default App