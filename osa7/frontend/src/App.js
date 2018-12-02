import React from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { connect } from 'react-redux'
import { notify } from './reducers/notificationReducer'
import { initializeUsers } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { readLoginState, logout } from './reducers/loginReducer'

class App extends React.Component {

  componentDidMount() {
    this.props.readLoginState()
    this.props.initializeUsers()
    this.props.initializeBlogs()
  } 



  render() {
    if (this.props.user === null) {
      return (
        <div>
          <Notification notification={this.state.notification} />
          <LoginForm />
        </div>
      )
    }

    const logout = () => {
      this.props.logout()
      this.props.notify('logged out')
    }  

    return (
      <div>
        <Notification store={this.props.store} />

        {this.props.user.name} logged in <button onClick={logout}>logout</button>

        <Togglable buttonLabel='uusi blogi'>
          <BlogForm store={this.props.store} />
        </Togglable>
        <BlogList store={this.props.store} />

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}


export default connect(mapStateToProps, { notify, initializeUsers, initializeBlogs, readLoginState, logout })(App)
