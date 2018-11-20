import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogAddForm from './components/BlogAddForm'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newBlog: '',
      title: '',
      author: '',
      url: '',
      username: '',
      password: '',
      message: null,
      user: null
    }
  }

  componentDidMount() {
    blogService
    .getAll()
    .then(blogs => blogs.sort((a,b) => b.likes-a.likes))
    .then(blogs => this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
      blogService.setToken(user.token)
    }    
  } 

 
  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.setState({
        message: {
          body: 'invalid username or password',
          type: 'error'
        }
      })
      setTimeout(() => {
        this.setState({ message: null})
      }, 4000)
    }
  }

  logout = async () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    this.setState({
      username: '',
      password: '',
      user: null
    })
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value })
  }
  handleAuthorChange = (event) => {
    this.setState({ author: event.target.value })
  }
  handleUrlChange = (event) => {
    this.setState({ url: event.target.value })
  }


  handleAddBlog = (event) => {
    this.setState({ newBlog: event.target.value })
  }

  handleLikeClick = async (event, blog) => {
    const blogList = await blogService.getAll()
    const likedBlog = blogList.filter(i => i._id === blog._id).reduce((a) => a)
    try {
      likedBlog.likes += 1
      await blogService.update(likedBlog._id, likedBlog)
      const sortedList =blogList.sort((a,b) => b.likes-a.likes)
      this.setState({
        blogs:sortedList
      })
    }catch (exception ) {
      console.log('Adding like failed')
    }
  }

  deleteBlog = async (event, blog) => {
    try {
      if (window.confirm(`Delete '${blog.title}' by ${blog.author}`)) {
        await blogService.remove(blog)
        const newList = this.state.blogs.filter(i => i._id !== blog._id)
        const sortedList =newList.sort((a,b) => b.likes-a.likes)
        this.setState({
          blogs:sortedList,
          message: {
            body: blog.title + ' by '+ blog.author + ' was deleted',
            type: 'info'
          }
        })
      }
    }catch (exception ) {
      console.log('Deleting blog failed')
    }
  }

  addBlog = (event) => {
    event.preventDefault()
    this.BlogAddForm.toggleVisibility()
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
      likes: 0
    }

    blogService
      .create(blogObject)
      .then(newBlog => {
        console.log(newBlog)
        console.log(this.state.blogs.concat(newBlog))
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          newBlog: '',
            message: {
              body: 'a new blog '+ newBlog.title + ' by '+ newBlog.author + ' added',
              type: 'info'
            }
        })

        setTimeout(() => {
          this.setState( { message: null } ) 
        }, 4000)
      })
  }


  render() {


    if (this.state.user === null) {
      return (
        <div>
        <Notification message={this.state.message}/>  
        <h2>Log in to application</h2>
    
        <form onSubmit={this.login}>
          <div>
            username
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleFieldChange}
            />
          </div>
          <div>
            Password
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleFieldChange}
            />
          </div>
          <button type="submit">Log in</button>
        </form>
      </div>
      )
    }

    return (
      <div>
        <Notification message={this.state.message}/>
        <h2>blogs</h2>
        <p>{this.state.user.name} logged in <button type="button" onClick={()=>this.logout()}>logout</button></p>
        <BlogAddForm ref={component => this.BlogAddForm = component}
          handleTitleChange={this.handleTitleChange}
          handleAuthorChange={this.handleAuthorChange}
          handleUrlChange={this.handleUrlChange}
          addBlog={this.addBlog}
          title={this.title}
          author={this.author}
          url={this.url}
        />
        {this.state.blogs.map(blog => 
          <Blog 
          key={blog._id} 
          blog={blog} 
          handleLikeClick={this.handleLikeClick}
          deleteBlog={this.deleteBlog}
          showDeleteButton={ blog.user.username === this.state.user.username || blog.user === null }
          />
        )}

      </div>
    );
  }
}

export default App;
