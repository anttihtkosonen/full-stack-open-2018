import React from 'react'
import { connect } from 'react-redux'
import BlogListRow from './BlogListRow'



class BlogList extends React.Component {

render(){
  const blogs = this.props.blogs
  console.log('blogs: ',blogs)
  return (
  <div>
    <h2>Blogs</h2>
    {blogs.map(blog => 
      <BlogListRow 
        blogID = {blog._id}
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