import { createStore, combineReducers, applyMiddleware } from 'redux'
import anecdoteReducer, { anecdoteInitialization } from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import anecdoteService from './services/anecdotes'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

anecdoteService.getAll().then(anecdotes =>
  store.dispatch(anecdoteInitialization(anecdotes))

)

export default store