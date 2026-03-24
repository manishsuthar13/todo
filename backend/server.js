const express = require("express")
const mongoose = require ("mongoose")
const cors = require("cors")
require("dotenv").config()


const app = express()


app.get("/", (req, res)=>{
    res.send("api test")
})

app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

const taskRoutes = require("./routes/task")
app.use("/api/tasks", taskRoutes)

const authRoutes = require("./routes/auth")
app.use("/api/auth", authRoutes)




const PORT = 5000


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB connected")
    app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))
})
.catch(err => console.log(err))
