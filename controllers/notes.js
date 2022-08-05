const notesRouter = require("express").Router()
const User = require("../models/user")
const Note = require("../models/note")

notesRouter.get("/info", (request, response) => {
  response.send("<h1>Hellod World!</h1>")
})

notesRouter.get("/", async (request, response) => {
  const notes = await Note
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(notes)
})

notesRouter.get("/:id", async (request, response) => {
  const note = await Note.findById(request.params.id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

notesRouter.post("/", async (request, response, next) => {
  const body = request.body
  const user = await User.findById(body.userId)

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    user: user._id
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  response.status(201).json(savedNote)
})

notesRouter.put("/:id", (request, response, next) => {
  const { content, important } = request.body

  const updatedNote = Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: "query" }
  )
    .catch((error) => next(error))
})

notesRouter.delete("/:id", async (request, response) => {
  await Note.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = notesRouter
