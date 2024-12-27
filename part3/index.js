require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Person = require('./models/person');
app.use(express.static('dist'));
app.use(express.json())
app.use(cors());
const PORT = process.env.PORT

morgan.token('body', function getPerson(req) {
    const { id, ...filteredBody } = req.body
    return JSON.stringify(filteredBody);
})
app.use(morgan(':method :url :response-time :body'))

/* ROUTES */
app.get('/api/persons', (req, resp) => {
    Person.find({}).then(persons => {
        resp.json(persons)
    })
})
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})
app.post('/api/persons', (req, resp) => {
    const body = req.body;

    if (!body.name)
        return response.status(400).json({ error: 'name missing' });
    if (!body.number)
        return response.status(400).json({ error: 'number missing' });

    const person = new Person({
        name: body.name,
        number: body.number
    });

    person.save().then(savedPerson => {
        resp.json(savedPerson)
    });
})
app.put('/api/persons/:id', (req, resp, next) => {
    const { number } = req.body;
    if (!number)
        return resp.status(400).json({ error: 'number missing' });
    Person
        .findByIdAndUpdate(req.params.id, { number }, { new: true })
        .then(updatedPerson => {
            if (updatedPerson) {
                resp.json(updatedPerson);
            } else {
                return resp.status('404').end();
            }
        })
        .catch(error => next(error))
})
app.delete('/api/persons/:id', (req, resp, next) => {
    Person
        .findByIdAndDelete(req.params.id)
        .then(result => {
            resp.status(204).end()
          })
          .catch(error => next(error))
})

app.get('/info', (req, resp) => {
    const entries = persons.length;
    const date = new Date();
    resp.send(`
        <p>Phonebook has info for ${entries} people</p>
        <p>${date}</p>
    `)
})


const unknownEndpoint = (req, resp) => {
    resp.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})