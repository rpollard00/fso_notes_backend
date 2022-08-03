const config = require("./utils/config")
const express = require("express")
const app = express()
const cors = require("cors")
const notesRouter = require("./controllers/notes")
const middleware = require("./utils/middleware")
const Note = require("./models/note")
const logger = require("./utils/logger")

app.use(cors())
app.use(express.json())
app.use(express.static("build"))

app.use("/api/notes", notesRouter)

// last middleware

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

app.listen(config.PORT)
logger.info(`Server running on port ${config.PORT}`)
