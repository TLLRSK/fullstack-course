const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (req, resp) => {
  Person.find({}).then((people) => {
    resp.json(people)
  })
})

personsRouter.get('/:id', (req, resp, next) => {
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

personsRouter.post('/', (req, res, next) => {
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

personsRouter.delete('/:id', (req, res, next) => {
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

personsRouter.put('/:id', (req, resp, next) => {
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

personsRouter.get('/info', (req, res, next) => {
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

module.exports = personsRouter