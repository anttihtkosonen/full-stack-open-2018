const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { bigBlogList, testBlogNoLike, testBlog, nonExistingId, blogsInDb } = require('./test_helper')
//jest.setTimeout(300000)


describe('When there initially are blogs in database', async () => {
  beforeAll(async () => {
  await Blog.deleteMany({})
  console.log('cleared')
  const blogObjects = bigBlogList.map(blog => new Blog(blog))
  await Promise.all(blogObjects.map(n => n.save()))  
})



test('GET api/blogs returns correct array of blogs', async () => {
  const blogsInDatabase = await blogsInDb()
  response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    expect(response.body.length).toBe(blogsInDatabase.length)

    const returnedContents = response.body.map(n => n.content)
    blogsInDatabase.forEach(blog => {
      expect(returnedContents).toContain(blog.content)
    })
})

describe('Addition of a blog', async () => {
  test('a valid blog can be posted', async () => {

      const newBlog = new Blog(testBlog)
      const blogsBefore = await blogsInDb()
      await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

      const blogsAfter = await blogsInDb()
      expect(blogsAfter.length).toBe(blogsBefore.length+1)
      const titles = blogsAfter.map(r => r.title)
      expect(titles).toContainEqual(newBlog.title)
      
  })
  
  test('a blog without likes set will be posted with zero likes', async () => {

    const newBlog = new Blog(testBlogNoLike)
    response = await api
    .post('/api/blogs')
    .send(newBlog)
    expect(response.body.likes).toBe(0)
  })


  test('attemping post without title- or url-field will return status 400', async () => {


    const newBlog = {
      author: 'testauthor',
      url: 'teststring',
      likes: 12
    }

    const newBlog2 = {
      title: 'testtitle',
      author: 'testauthor',
      likes: 12
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

    await api
    .post('/api/blogs')
    .send(newBlog2)
    expect(400)  
  })
})

describe('Deletion of a blog', async () => {
  let addedBlog
  beforeAll(async () => {
    addedBlog = new Blog(
      { title: 'addedBlogTitle',
        author: 'addedBlogAuthor',
        url: 'addedBlogUrl',
        likes: 0
      })
    await addedBlog.save()
  })
  
  test('Delete-command succeeds properly', async () => {
    const blogsBefore = await blogsInDb()
    await api
    .delete(`/api/blogs/${addedBlog._id}`)
    .expect(204)
    const blogsAfter = await blogsInDb()
    expect(blogsAfter.length).toBe(blogsBefore.length-1)
    const titles = blogsAfter.map(r => r.title)
    expect(titles).not.toContainEqual(addedBlog.title)
  })
})

describe('Editing a blog', async () => {
  let blogToEdit
  let blogWithEdit
  beforeAll(async () => {
    blogToEdit = new Blog(
      { title: 'blogToEditTitle',
        author: 'blogToEditAuthor',
        url: 'blogToEditUrl',
        likes: 0
      })
    await blogToEdit.save()
    blogWithEdit =
      { title: 'blogToEditTitle',
        author: 'blogToEditAuthor',
        url: 'blogToEditUrl',
        likes: 1
      }
  })
  
  test('Editing likes succeeds correctly', async () => {
    await api
    .put(`/api/blogs/${blogToEdit._id}`)
    .send(blogWithEdit)
    .expect(201)
    const blogAfterEdit = await api.get(`/api/blogs/${blogToEdit._id}`)
    console.log(blogAfterEdit.body)
    expect (blogAfterEdit.body.likes).toBe(blogWithEdit.likes)

  })
})

afterAll(() => {
  server.close()
})

})