import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { notify } from '../reducers/notificationReducer'
import { NavLink } from 'react-router-dom'

class Menu extends React.Component {
  logout = () => {
    this.props.logout()
    this.props.notify('You have logged out', 3000)
  }

  render(){

      const style = {
        fontWeight: 'bold',
        backgroundColor: '#e5efff',
        padding: 20
      }

      return (
        <div>
          <div>
            <h1>Blog App</h1>
          </div>
          <div style = {style}>
            <span >
              <NavLink exact to="/" >Blogs</NavLink> &nbsp;
              <NavLink to="/users" >Users</NavLink> &nbsp;
              {this.props.login.name} is logged in <button onClick={logout}>Logout</button>
            </span>
          </div>
        </div>
      )
    }
        

}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}


export default connect(mapStateToProps, { notify, logout })(Menu)
