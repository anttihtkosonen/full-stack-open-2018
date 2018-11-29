

const notificationReducer = (store = '', action) => {
  switch (action.type) {
  case 'SHOW':
    //console.log('show')
    return action.content
  case 'RESET':
    return ''
  default:
    return store
  }
}


export const notifying =(content, timeout) => {
  return async (dispatch) => {
    dispatch({
      type: 'SHOW',
      content: content
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET',
        content: ''
      })
    }, timeout*1000)
  }
}

export default notificationReducer