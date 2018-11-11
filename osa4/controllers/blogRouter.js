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


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})


blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if(blog.title === undefined || blog.title ==='' || blog.url === undefined || blog.url ===''){
    return response.status(400).json({error: 'Input missing title- or url-field'})
  } else {
    if(blog.likes===undefined){
      blog.likes=0
    }
    newBlog = await blog.save()
    return response.status(201).json(newBlog)
  }
})

module.exports = blogRouter