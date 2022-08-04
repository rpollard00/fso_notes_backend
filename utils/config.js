require("dotenv").config()

const PORT = process.env.PORT


const MONGODB_URI = process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI_NOTES
    : process.env.MONGODB_URI_NOTES

module.exports = {
  MONGODB_URI,
  PORT,
}
