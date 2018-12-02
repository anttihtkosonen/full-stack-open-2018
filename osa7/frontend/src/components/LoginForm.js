import React from 'react'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'

class LoginForm extends React.Component {
 
  handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const username = e.target.username.value
      const password = e.target.password.value
      e.target.username.value = ''
      e.target.password.value = ''
      this.props.login(username, password)
      this.props.notify('welcome back!')
    } catch (exception) {
      this.notify('Käyttäjätunnus tai salasana virheellinen', 3000)
    }
  }


  render(){
    return (
      <div>
        <h2>Kirjaudu sovellukseen</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            käyttäjätunnus
            <input
              name="username"
            />
          </div>
          <div>
              salasana
              <input
              name="password"
            />
          </div>
          <button type="submit">Kirjaudu</button>
        </form>
      </div>
    )
  }

}


export default connect(null, { notify, login })(LoginForm)