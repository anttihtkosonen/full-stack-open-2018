import React from 'react'
import { voting } from './../reducers/anecdoteReducer'
import { notifying } from './../reducers/notificationReducer'
import { connect } from 'react-redux'
import Filter from './Filter'

class AnecdoteList extends React.Component {
  vote = async (anecdote) => {
    this.props.voting(anecdote)
    this.props.notifying(`Anecdote ${anecdote.content} voted`, 5)
  }

  render() {
    const anecdotes = this.props.anecdotesToShow
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() =>
                this.vote(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapDispatchToProps = {
  voting,
  notifying
}

const mapStateToProps = (state) => {
  //console.log('state at mapping: ',state.anecdotes)
  return {
    anecdotesToShow:state.anecdotes
      .filter(anec => anec.content.includes(state.filter))
      .sort((a, b) => b.votes - a.votes) }
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)


export default ConnectedAnecdoteList
