import users from '../services/users'

const reducer = (store = [], action) => {
    switch (action) {
        case 'INITIALIZE':
        return store = action.content
        case 'CREATE':
        return store.concat(action.content)
        default:
        return store
    }
}

export const createUser = (username, name, password, adult) => {
    return async (dispatch) => {
      const userObj = {
        username: username,
        name: name,
        password: password,
        adult: adult
      }
      const user = await users.create(userObj)
      dispatch({
        type: 'CREATE',
        user: {user}
      })
    }
  }

export const initializeUsers = () => {
    return async (dispatch) => {
      const content = await users.getAll()
      dispatch({
        type: 'INITIALIZE',
        content
      })
    }
  }


export default reducer