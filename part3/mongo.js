const mongoose = require('mongoose');
const { MONGODB_URI } = process.env;

const url = MONGODB_URI;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema);