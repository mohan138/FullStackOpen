const mongoose = require('mongoose');

const url = `mongodb+srv://Avayamukhari:9MHAE0pVuT66iBmS@phonebook.qzqmvh9.mongodb.net/Phonebook?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  phone: Number
})

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  id: process.argv[3],
  name: process.argv[4],
  phone: process.argv[5],
})

person.save().then(result => {
  console.log(`added ${person.name} number ${person.phone} to phonebook`);
  mongoose.connection.close();
});
