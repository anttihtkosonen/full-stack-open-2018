const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
})

blogSchema.statics.format =(blog) => {
  return {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    user: blog.user,
    _id: blog._id,
    comments: blog.comments !== undefined ? blog.comments : []
  }
}

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog