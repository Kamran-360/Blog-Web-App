const express = require('express')
const router = express.Router()
const blog = require('../models/blogs')


//for getting all the blogs
router.get("/", async (req, res) => {
    try {
        const blogs = await blog.find({})

        res.render("main.ejs", { blogs: blogs })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router