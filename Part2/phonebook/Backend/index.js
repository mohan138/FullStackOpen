
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const Person = require("./modules/person");
require("dotenv").config();

morgan.token("body", req => {
  return JSON.stringify(req.body);
})

app.use(cors(), express.json(), morgan(":method :url :status :res[content-length] - :response-time ms :body"), express.static("build"));

const url = process.env.MONGODB_URL;


app.get("/persons", async (request, response) => {
  try {
    await mongoose.connect(url);
    const result = await Person.find({});
    console.log(result);
    await mongoose.connection.close();
    response.status(200).json(result);
  } catch (error) {
    response.status(500).json({ error: "Failed to retrieve persons" });
    await mongoose.connection.close();
  }
});

app.get("/persons/:id", async (request, response) => {
  try {
    await mongoose.connect(url);
    const result = await Person.findOne({ id: request.params.id });
    if (result) {
      response.status(200).json(result);
    } else {
      response.status(404).json({ error: "Person not found" });
    }
    await mongoose.connection.close();
  } catch (error) {
    response.status(500).json({ error: "Failed to retrieve person" });
    await mongoose.connection.close();
  }
});


app.post("/persons", async (request, response) => {
  try {
    await mongoose.connect(url);
    const existingPersons = await Person.find({});
    console.log(existingPersons);
    const existingIds = existingPersons.map(person => person.id);
    const maxId = Math.max(...existingIds);
    const newPerson = new Person({
      id: Math.round(Math.random() * 10000),
      Name: request.body.Name,
      Phone: request.body.Phone
    });
    const result = await newPerson.save();
    console.log(result);
    await mongoose.connection.close();
    response.status(201).json(result);
  } catch (error) {
    response.status(500).json({ error: "Failed to create person" });
    mongoose.connection.close();
  }
});


app.get("/info", (request, response) => {
  response.send(`
  <p>Phonebook has info for ${Notes.length} people</p>
  <p>${Date()}</p>`);
})

app.put("/persons/:id", async (request, response) => {
  try {
    await mongoose.connect(url);
    const person = await Person.findOne({ id: request.params.id });
    if (!person) {
      return response.status(404).json({ error: "Person not found" });
    }
    const result = await Person.updateOne({ id: request.params.id }, { $set: { Phone: request.body.number } });
    const updatedPerson = await Person.findOne({ id: request.params.id });
    response.status(201).json(updatedPerson);
  } catch (error) {
    response.status(500).json({ error: "Failed to update person" });
  }
});


app.delete("/persons/:id", async (request, response) => {
  try {
    await mongoose.connect(url);
    const result = await Person.deleteOne({ id: request.params.id });
    mongoose.connection.close();
    response.status(200).json({ message: "Document deleted successfully", result });
  } catch (error) {
    response.status(500).json({ error: "Failed to delete document" });
  }
})


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});