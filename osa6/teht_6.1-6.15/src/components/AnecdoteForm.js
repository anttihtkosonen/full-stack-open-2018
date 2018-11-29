import React from 'react'
import { creating } from './../reducers/anecdoteReducer'
import { notifying } from './../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteForm extends React.Component {
  handleSubmit = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    //const newAnecdote = await anecdoteService.createNew(content)
    //console.log('new anecdote: ', newAnecdote)
    this.props.creating(content)
    this.props.notifying(`Anecdote ${content} created`, 5)
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  creating,
  notifying
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)


export default ConnectedAnecdoteForm