import React from 'react'
import PropTypes from 'prop-types'


class BlogAddForm extends React.Component {
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
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return(
      <div>
        <div style={hideWhenVisible} >
        <button onClick={this.toggleVisibility}>new blog</button>

        </div>
        <div style={showWhenVisible} >
          <div>
          <h2>Add new blog</h2>
          <form onSubmit={this.props.addBlog} >
            <div>
              Title: <input 
                value = {this.props.title} 
                onChange={this.props.handleTitleChange}
                />
            </div>
            <div>
              author: <input 
                value = {this.props.author} 
                onChange={this.props.handleAuthorChange}
              />
            </div>           
            <div>
              url: <input 
                value = {this.props.url} 
                onChange={this.props.handleUrlChange}
              />
            </div> 
            <div>
            <button type="submit">create</button>
            </div>
          </form>
        </div>
        <div>
        <button onClick={this.toggleVisibility}>cancel</button>
        </div>
      </div>
    </div>
    )
  }

}
BlogAddForm.propTypes = {
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  addBlog: PropTypes.func.isRequired
}
export default BlogAddForm