import React from 'react'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

class BlogForm extends React.Component {
 
  handleSubmit = (e) => {
    e.preventDefault()

    const blogObj = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value,
    } 
    e.target.title.value = ''
    e.target.author.value = ''
    e.target.url.value = ''
    
    this.props.createBlog(blogObj)
    this.props.notify(`anecdote ${blogObj.title} created`, 5000)

  }
 
 render(){
  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={this.handleSubmit}>
        <div>
          title
          <input
            name='title'
          />
        </div>
        <div>
          author
          <input
            name='author'
          />
        </div>
        <div>
          url
          <input
            name='url'
          />
        </div>        

        <button type="submit">Submit</button>
      </form>
    </div>
   )
   }

/*
  BlogForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    author: PropTypes.string,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }
  */
}


export default connect(null, { createBlog, notify })(BlogForm)