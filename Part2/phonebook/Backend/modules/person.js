const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);
const url = process.env.MONGODB_URL
console.log(url);

mongoose.connect(url).then(result => {
  console.log("connected to the Data base");
}).catch((error) => {
  console.log(error);
})

const personSchema = new mongoose.Schema({
  id: Number,
  Name: String,
  Phone: Number
})

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Person", personSchema);