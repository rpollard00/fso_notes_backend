const mongoose = require("mongoose")
const { info, error } = require("../utils/logger.js")

const url = process.env.MONGODB_URI_NOTES

info("connecting to", url)

mongoose
  .connect(url)
  .then((result) => info("connected to MongoDB"))
  .catch((error) => error("error connecting to MongoDB:", error.message))

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  important: Boolean,
})

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model("Note", noteSchema)
