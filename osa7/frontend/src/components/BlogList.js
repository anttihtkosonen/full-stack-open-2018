import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'



class BlogList extends React.Component {

render(){
  const blogs = this.props.blogs
  return (
  <div>
    <h2>Blogs</h2>
    {blogs.map(blog => 
      <Blog 
        key={blog._id}         
      />
    )}
  </div>
  )}
}

const byLikes = (b1, b2) => b2.likes - b1.likes


const mapStateToProps = (state) => {
  return {
    blogs: state.blogs.sort(byLikes)
  }
}



export default connect(mapStateToProps, {} )(BlogList)