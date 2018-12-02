import loginService from '../services/login'
import blogService from '../services/blogs'

const loginReducer = (store = null, action) => {
  switch(action.type) {
  case 'LOGIN':
    return action.content
  default:
    return store
  }
}
export const readLoginState = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        content: user
      })
    }
  }
}

export const login = ( username, password ) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username: username,
        password: password
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN',
        content: user
      })
    }
    
    catch (exception) {
      dispatch({
        type: 'NOTIFY',
        content: 'käyttäjätunnus tai salasana virheellinen'
      })
      setTimeout(() => {
        dispatch({
          type: 'RESET',
          content: ''
        })
      }, 4000)
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    dispatch({
      type: 'LOGIN',
      content: null
    })
  }
}
export default loginReducer