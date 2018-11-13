const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
  .find({})
  .populate('user', { username: 1, name: 1 } )
  response.json(blogs.map(Blog.format))
})


blogRouter.post('/', async (request, response) => {
  try{
    const body = request.body
    if(body.title === undefined || body.title ==='' || body.url === undefined || body.url ===''){
      return response.status(400).json({error: 'Input missing title- or url-field'})
    } else {
      if(body.likes===undefined){
        body.likes=0
    }
    const user = await User.findById(body.userId)
    const blog = new Blog(
      {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
      }
    )
    newBlog = await blog.save()
    user.blogs = user.blogs.concat(newBlog._id)
    await user.save()    
    return response.status(201).json(Blog.format(newBlog))
    }
  }catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }

})

blogRouter.get('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)

    if (blog) {
      response.json(Blog.format(blog))
    } else {
      response.status(404).end()
    }

  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogRouter.put('/:id', async (request, response) => {
  try{
    if(request.body.title === undefined || request.body.title ==='' || request.body.url === undefined || request.body.url ===''){
      return response.status(400).json({error: 'Input missing title- or url-field'})
    } else {
      let blog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes
      }
      if(blog.likes===undefined){
        blog.likes=0
      }
      newBlog = await Blog.findOneAndUpdate({ _id: request.params.id }, blog, { new: true } )
      return response.status(201).json(Blog.format(newBlog))
    }
  }catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'malformatted id' })
  }
})


module.exports = blogRouter