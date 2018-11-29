import anecdoteService from './../services/anecdotes'

const anecdoteReducer = (store = [], action) => {
  //const old = store.filter(a => a.id !== action.id)
  //const voted = store.find(a => a.id === action.id)
  console.log(action.type)
  switch(action.type) {
  case 'VOTE':
    //return [...old, { ...voted, votes: voted.votes + 1 }]
    return store

  case 'CREATE':
    return [...store, { content: action.data.content, id: action.data.id, votes: 0 }]

  case 'INIT_ANECDOTES':
    return action.data

  default:
    return store
  }
}

export const voting = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = {
      content: anecdote.content,
      id: anecdote.id,
      votes: anecdote.votes += 1
    }
    //console.log('voted anecdote: ', anecdote)
    //console.log('after update: ', votedAnecdote)
    const updatedAnecdote = await anecdoteService.update(votedAnecdote.id, votedAnecdote )
    //console.log('after PUT: ', updatedAnecdote)
    dispatch({
      type: 'VOTE',
      id: updatedAnecdote
    })
  }
}

export const creating = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}


export default anecdoteReducer