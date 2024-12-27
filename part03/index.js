const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

// MIDDLEWARE
const reqLogger = (req, resp, next) => {
    console.log('Method:', req.method)
    console.log('Path:  ', req.path)
    console.log('Body:  ', req.body)
    console.log('---')
    next() // Yields control to the next middleware
}

app.use(express.json()) // Activating express' json parser
app.use(cors());
app.use(express.static('dist'));
morgan.token('body', function getPerson(req) {
    const {id, ...filteredBody} = req.body
    return JSON.stringify(filteredBody);
})
app.use(morgan(':method :url :response-time :body'))

// UTILS
const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => Number(n.id))) // getting the highest id Number in notes arr
        : 0
    return String(maxId + 1) // turning id into String
}

/* ROUTES */
/**  PERSONS **/
const generatePersonId = () => {
    return String(Math.floor(Math.random() * 1000));
}
app.get('/api/persons', (req, resp) => {
    resp.json(persons);
})
app.get('/api/persons/:id', (req, resp) => {
    const id = req.params.id;
    const person = persons.find(p => p.id === id);
    if (person) {
        resp.json(person);
    } else {
        resp.status(404).end();
    }
})
app.post('/api/persons', (req, resp) => {
    // 1. Person data is the req body
    const person = req.body;
    // 2. Checks if req's body has content
    if (!req.body.name) {
        return resp.status(400).json(
            { error: "introduce a name" }
        );
    }
    if (!req.body.number) {
        return resp.status(400).json(
            { error: "introduce a number" }
        );
    }
    // 3. Checks if name exists previously
    if (persons.find(p => p.name === req.body.name)) {
        return resp.status(400).json(
            { error: "name must be unique" }
        )
    }
    // 3. Assigning id to person
    person.id = generatePersonId();
    // 3. Create a new persons array with the new person
    persons = persons.concat(person)
    // 4. Reponses the client with a JSON
    resp.json(person)
})
app.delete('/api/persons/:id', (req, resp) => {
    const id = req.params.id;
    persons = persons.filter(p => p.id !== id);
    console.log("deleting person: ", id)
    resp.status(204).end()
})

app.get('/info', (req, resp) => {
    const entries = persons.length;
    const date = new Date();
    resp.send(`
        <p>Phonebook has info for ${entries} people</p>
        <p>${date}</p>
    `)
})

// Middleware after routes, catching invalid endpoints requests
const unknownEndpoint = (req, resp) => {
    resp.status(404).send({ error: 'unknown endpoint' })
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})