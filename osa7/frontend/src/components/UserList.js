import React from 'react'
import { connect } from 'react-redux'
import UserListRow from './UserListRow'



class UserList extends React.Component {

render(){
  const users = this.props.users
  console.log('users: ',users)
  return (
  <div>
    <h2>Users</h2>
    <table>
      <tr>
        <th>User</th>
        <th>Number of blogs</th>
      </tr>
        {users.map(user => 
        <UserListRow 
            user = {user}
            key={user._id}         
        />
        )}
    </table>
  </div>
  )}
}
//const byBlogs = (b1, b2) => b2.blogs.length() - b1.blogs.length()

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}



export default connect(mapStateToProps)(UserList)