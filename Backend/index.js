const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser');
const route = require("./routes/app");

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())

// parse application
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//routes
route(app)

app.listen(8000, () => {
    console.log("Sever is running")
})
