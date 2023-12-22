//routes for successfully handling all the reqs
const express = require('express')
const router = express.Router()
const blog = require('../models/blogs')

// router.use(express.static("views"))
async function findBlog(req, res, next) {
    let Blog
    try {
        Blog = await blog.findById(req.params.id)
        if (Blog == null) {
            return res.status(404).json({ message: "Can't find the requested blog" })
        }
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
    res.Blog = Blog
    next()
}


//for creating a blog
router.post("/", async (req, res) => {
    console.log(req.body.description)
    const Blog = new blog({
        title: req.body.title,
        description: req.body.description
    })
    try {
        console.log(Blog)
        const newBlog = await Blog.save()
        res.status(201).redirect("home")
    } catch (error) {
        console.log("i ran in carch")
        res.status(400).json({ message: error.message })
    }

})

//for getting all the blogs
router.get("/", async (req, res) => {
    try {
        const blogs = await blog.find({})

        res.render("home.ejs", { blogs: blogs })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//for getting a single blog
router.get("/:id", findBlog, (req, res) => {
    res.render("read", { blog: res.Blog })
})

router.get("/edit/:id",findBlog,(req,res)=>{
    res.render("edit",{blog:res.Blog})
})

//for updating a patch in the blog
router.patch("/:id", findBlog, async (req, res) => {
    if (req.body.title != null) {
        res.Blog.title = req.body.title
    }
    if (req.body.description != null) {
        res.Blog.description = req.body.description
    }
    try {
        const updatedBlog = await res.Blog.save()
        res.redirect("home")
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//for deleting the blog in the database
router.delete("/:id", findBlog, async (req, res) => {
    if (res.Blog != null) {
        try {
            await blog.deleteOne({ _id: req.params.id })
            res.status(201).redirect("home")
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
})




module.exports = router