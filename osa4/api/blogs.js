
const mongoose = require('mongoose')

if ( process.env.NODE_ENV !== 'production' ) {
    require('dotenv').config()
}
  
const url = process.env.MONGODB_URI


mongoose.connect(url, { useNewUrlParser: true })

const Schema = mongoose.Schema
const blogSchema = new Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

blogSchema.statics.format = function (blog) {
    return {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        id: blog._id
    }
}

const Blog = mongoose.model('Blog', blogSchema)

module.exports =Blog