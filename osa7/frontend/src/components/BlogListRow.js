import React from 'react'
import { connect } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

class BlogListRow extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false
    }
  }

  like = (blog) => async () => {
    console.log('like: ',blog)
    this.props.likeBlog(blog)
    this.props.notify(`blog ${blog.title} liked`, 5000)
  }

  remove = (blog) => async () => {
    console.log('remove: ',blog)
    this.props.removeBlog(blog)
    this.props.notify(`blog ${blog.title} removed`, 5000)
  }

  render() {
    const { blog } = this.props
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const contentStyle = {
      display: this.state.visible? '' : 'none',
      margin: 5,
    }

    const adder = blog.user ? blog.user.name : 'anonymous'

    //const deletable = this.blog.user === undefined || this.blog.user.username === this.blog.user.username
    const deletable = true

    return (
      <div style={blogStyle}>
        <div 
          onClick={() => this.setState({ visible: !this.state.visible })} 
          className='name'
        >
          {blog.title} {blog.author}
        </div>
        <div style={contentStyle} className='content'>
          <div>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div>
            {blog.likes} likes <button onClick={this.like(blog)}>like</button>
          </div>
          <div>
            added by {adder}
          </div>
          {deletable && <div><button onClick={this.remove(blog)}>delete</button></div>}
        </div>
      </div>  
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    blog: state.blogs.find(i => i._id === ownProps.blogID)
  }
}



export default connect(mapStateToProps, { likeBlog, removeBlog, notify })(BlogListRow)