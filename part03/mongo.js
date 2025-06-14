const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://pjUser:${password}@cluster0.tlo03.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);
/*
First, we define the schema of a note that is stored in the noteSchema variable.
The schema tells Mongoose how the note objects are to be stored in the database.
*/
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});
/* In the Note model definition, the first "Note" parameter is the singular name of the model. */
const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
});

process.argv.length > 3
  ? person.save().then((result) => {
      console.log(`added ${person.name} number ${person.number} to phonebook`);
      mongoose.connection.close();
    })
  : Person.find({}).then(result => {
    console.log('Phonebook:');
    result.forEach(person => {
        console.log(person.name, person.number);
    })
    mongoose.connection.close();
  });

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

// Note.find({}).then((result) => {
//   result.forEach((note) => {
//     console.log(note);
//   });
//   mongoose.connection.close();
// });
