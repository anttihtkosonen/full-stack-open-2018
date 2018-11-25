import React from 'react';
import actionFor from './actionCreators'


class App extends React.Component {
  voteAnecdote = (id) => () => {
    this.props.store.dispatch(
      actionFor.voting(id)
    )
  }

  addAnecdote = (event) => {
    event.preventDefault()
    this.props.store.dispatch(
      actionFor.addingAnecdote(event.target.anecdote.value)
      )
    event.target.anecdote.value = ''
  } 

  render() {
    const anecdotes = this.props.store.getState()
    const sortedAnecdotes = anecdotes.sort(function(a, b){return b.votes - a.votes})
    return (
      <div>
        <h2>Anecdotes</h2>
        {sortedAnecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.voteAnecdote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name='anecdote' /></div>
          <button type='submit'>create</button> 
        </form>
      </div>
    )
  }
}

export default App 