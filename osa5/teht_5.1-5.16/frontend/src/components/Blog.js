import React from 'react'
import PropTypes from 'prop-types'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }

  render() {
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }
    const showDeleteButton = { display: this.props.showDeleteButton ? '' : 'none' }
    const blogStyle = {
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
//    console.log(showDeleteButton, this.props.showDeleteButton)
    return (
      <div style={blogStyle}>
        <div className='blog-shown' onClick={this.toggleVisibility}>
          <div>
            {this.props.blog.title} {this.props.blog.author}
          </div>
        </div>  
        <div className='blog-hidden' style={showWhenVisible}>
            <div>{this.props.blog.url}</div>
            <div>{this.props.blog.likes} likes <button onClick={ e => this.props.handleLikeClick(e,this.props.blog)} >like</button></div>
            <div>added by {this.props.blog.user.name}</div> 
            <button style={showDeleteButton} onClick={ e => this.props.deleteBlog(e,this.props.blog)} >delete</button>
          </div>
        </div>
    )
  }
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikeClick: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  showDeleteButton: PropTypes.bool.isRequired
}
export default Blog