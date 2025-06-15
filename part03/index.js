require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')

// MIDDLEWARE
const reqLogger = (req, resp, next) => {
  console.log('Method:', req.method)
  console.log('Path:  ', req.path)
  console.log('Body:  ', req.body)
  console.log('---')
  next()
}

const errorHandler = (error, req, resp, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return resp.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return resp.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(express.static('dist'))
app.use(express.json())
app.use(reqLogger)

morgan.token('body', function getPerson(req) {
  const { ...filteredBody } = req.body
  return JSON.stringify(filteredBody)
})
app.use(morgan(':method :url :response-time :body'))

/* ROUTES */

app.get('/api/persons', (req, resp) => {
  Person.find({}).then((people) => {
    resp.json(people)
  })
})

app.get('/api/persons/:id', (req, resp, next) => {
  const id = req.params.id
  Person.findById(id)
    .then((person) => {
      if (person) {
        resp.json(person)
      } else {
        resp.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({ error: 'name is required' })
  }
  if (!body.number) {
    return res.status(400).json({ error: 'number is required' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson)
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).end()
      }
      console.log('Deleted person:', id)
      res.status(204).end()
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, resp, next) => {
  const { name, number } = req.body

  Person.findById(req.params.id)
    .then((person) => {
      if (!person) {
        return resp.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        resp.json(updatedPerson)
      })
    })
    .catch((error) => next(error))
})

app.get('/info', (req, res, next) => {
  Person.countDocuments({})
    .then((count) => {
      const date = new Date()
      res.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${date}</p>
      `)
    })
    .catch((error) => next(error))
})

// Middleware after routes, catching invalid endpoints requests
const unknownEndpoint = (req, resp) => {
  resp.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
