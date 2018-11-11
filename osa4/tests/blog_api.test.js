const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blogModel')
jest.setTimeout(300000)

const testBlog = 
{
  "title": "Test Blog Title",
  "author": "Test Blog Author",
  "url": "Test Blog Url",
  "likes": 35165165
} 

const testBlogNoLike = 
{
  "title": "Second Test Blog Title",
  "author": "Second Test Blog Author",
  "url": "Second Test Blog Url",
}

const bigBlogList = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }  
]


beforeAll(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  const blogObjects = bigBlogList.map(blog => new Blog(blog))
  const promiseArray = bigBlogList.map(blog => 
    api
    .post('/api/blogs')
    .send(blog)
    )
  await Promise.all(promiseArray)
})



describe.skip('Working tests', () => {

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('a valid blog can be posted', async () => {

    const newBlog = new Blog(testBlog)

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

//    console.log(titles, response.body)
    expect(response.body.length).toBe(bigBlogList.length+1)
    expect(titles).toContain("Kannattaako pyöräilykypärän käyttöä suositella")
    
})
  
test('a blog without likes set will be posted with zero likes', async () => {

  const newBlog = new Blog(testBlogNoLike)

  response = await api
  .post('/api/blogs')
  .send(newBlog)
  console.log(newBlog, response.body)
  expect(response.body.likes).toBe(0)
})
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

afterAll(() => {
  server.close()
})