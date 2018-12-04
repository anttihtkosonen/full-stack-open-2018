import React from 'react'
import { connect } from 'react-redux'
//import { notify } from '../reducers/notificationReducer'
import { NavLink } from 'react-router-dom'

class SingleUser extends React.Component {

    render() {
        const users = this.props.users
        const {user, blogs} = this.props
        console.log('users: ', users)
        console.log('single user: ', user)
        
        const Usersblogs = blogs.filter(blog => blog.user.username === user.username) 
        return (
            <div>
                <h2>{user.name}</h2>
                <h3>Added blogs</h3>
                {Usersblogs.map(blog =>
                <list key={blog._id}  >
                <NavLink exact to={`/blogs/${blog._id}`} >
                {blog.title} </NavLink></list>)}
            </div>
    )
  }
}



const mapStateToProps = (state, ownProps) => {
    return {
      user: state.users.find(user => user._id === ownProps.userID),
      users: state.users,
      blogs: state.blogs
    }
}


export default connect(mapStateToProps)(SingleUser)