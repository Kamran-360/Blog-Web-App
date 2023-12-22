const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
    ,
    createdat: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model("blog",blogSchema)