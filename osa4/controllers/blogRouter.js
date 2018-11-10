const blogRouter = require('express').Router()
const Blog = require('../models/blogModel')


const formatBlog = (blog) =>{
    return {
        title: String,
        author: String,
        url: String,
        likes: Number        
    }
}


blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogRouter