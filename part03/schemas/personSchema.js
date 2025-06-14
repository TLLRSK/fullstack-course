const { default: mongoose } = require("mongoose")
/*
First, we define the schema of a note that is stored in the noteSchema variable.
The schema tells Mongoose how the note objects are to be stored in the database.
*/
const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

const Person = mongoose.model('Person', personSchema);