const  express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")

const authRoute = require("./routes/auth")

dotenv.config()

const  app = express()

const MONGODB_URL  = process.env.MONGODB_URL
mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB connection successful...");
    })
    .catch((err) => {
        console.log("MongoDB connection failed", err.message);
    });

app.use(cors())
app.use(cookieParser())
app.use(express.json())


//routes
app.use("/auth",authRoute)

app.listen(8000,()=>{
    console.log("Sever is running")
})
