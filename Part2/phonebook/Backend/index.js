
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

morgan.token("body", req => {
  return JSON.stringify(req.body);
})

app.use(cors(), express.json(), morgan(":method :url :status :res[content-length] - :response-time ms :body"), express.static("build"));


let Notes =
  [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
  ]

app.get("/persons", (request, response) => {
  response.json(Notes);
})

app.get("/persons/:id", (request, response) => {
  const note = Notes.find(note => note.id === Number(request.params.id));
  if (note)
    response.json(note);
  else
    response.status(404).end();
})

app.post("/persons", (request, response) => {
  const generateID = () => {
    const maxID = Notes.length > 0 ? Math.max(...Notes.map(note => note.id)) : 0;
    return maxID;
  }
  if (!request.body.name || !request.body.number) {
    response.status(400).json({ error: "The name or number is missing" });
  }

  else if ((Notes.map(note => note.name)).includes(request.body.name)) {
    response.status(400).json({ error: "name must be unique" });
  }
  else {
    const note = {
      id: generateID() + 1,
      name: request.body.name,
      number: request.body.number
    }

    Notes = Notes.concat(note);
    //response.json(Notes);
    response.status(201).end();
  }
})

app.get("/info", (request, response) => {
  response.send(`
  <p>Phonebook has info for ${Notes.length} people</p>
  <p>${Date()}</p>`);
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});