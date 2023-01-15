// IMPORT DEPENDENCIES
require("dotenv").config() // load env variables
const { PORT, DATABASE_URL } = process.env // destructure variables
const express = require("express")
const mongoose = require("./models/connection") // connects to db
const cors = require("cors")
const morgan = require("morgan")
const Cheese = require("./models/cheese")


// CREATE EXPRESS APP OBJECT
const app = express()


// MIDDLEWARE
app.use(cors())
app.use(morgan("dev"))
app.use(express.json()) // to parse json bodies from client (for POST and PUT requests)


// ROUTES
app.get("/", (req, res) => {
    res.send("Hello World")
})

// Cheese Index
app.get("/cheeses", async (req, res) => {
    try {
        // send all cheeses as json
        res.json(await Cheese.find({}))
    } catch(error) {
        res.status(400).json(error)
    }
})

// Cheese Create
app.post("/cheeses", async (req, res) => {
    try {
        // create new cheese and send it back?
        res.json(await Cheese.create(req.body))
    } catch(error) {
        res.status(400).json(error)
    }
})


// TURN ON SERVER
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})