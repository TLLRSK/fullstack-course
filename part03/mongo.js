const mongoose = require('mongoose');
const { DB_URI, DB_PASSWORD} = process.env;
if (process.argv.length < 3) {
    console.log("give a password as argument");
    process.exit(1);
}

const url = DB_URI;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema);

if (process.argv[3] && process.arg[4]) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })

    person.save().then(result => {
        console.log(`added ${person.name} with number ${person.number}`);
        mongoose.connection.close();
    })

}

if (process.argv.length == 2) {
    Person
        .find({})
        .then(result => {
            console.log("Phonebook: ")
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
            mongoose.connection.close();
        })
} else {
    mongoose.connection.close();
}
