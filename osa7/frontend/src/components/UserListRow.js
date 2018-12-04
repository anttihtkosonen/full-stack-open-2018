import React from 'react'
import { connect } from 'react-redux'
//import { notify } from '../reducers/notificationReducer'

class UserListRow extends React.Component {

    render() {
        const {user, blogs} = this.props
        console.log('user listed: ',user.name)
        const Usersblogs = blogs.filter(blog => blog.user.username === user.username) 
        return (
            <tr>
                <th>
                    {user.name}
                </th>
                <th>
                    {Usersblogs.length}
                </th>
            </tr>
    )
  }
}



   
const mapStateToProps = (state, ownProps) => {
    return {
      user: ownProps.user,
      blogs: state.blogs
    }
  }

export default connect(mapStateToProps, { })(UserListRow)