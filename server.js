//creating a blog admins rest API
require('dotenv').config()
const express = require('express')
const db = require('./db/connect');
const routerBlogs = require('./routes/blogs')
const mainRoutes = require('./routes/mainRouter')
const path = require("path")
const app = express()
app.use("/public/images",express.static("./public/images"));
app.set("view engine",'ejs')
app.use(express.json())
app.use("/blogs", routerBlogs)

////connecting to the database and listening at the port with handling all the errors

app.use("/",mainRoutes)
const start = () => {
    try {
        db(process.env.MONGO_URL)
        app.listen(8080, () => { console.log("Server is running at port 8080...") })
    } catch (error) {
        console.log(error)
    }
}

start()