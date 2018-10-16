import React from 'react'
import ReactDOM from 'react-dom'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      best: 0,
      votes: [0,0,0,0,0,0]
    }
  }

  loadNew = () => {
    let nor = 0
    do {
      nor = Math.floor(Math.random() *6);
    }
    while (nor === this.state.selected)
    return () => this.setState({selected: nor})
    
  }

  voteThis = () => {
      let newBest;
      let copy = [...this.state.votes];
      copy[this.state.selected] += 1;
//      console.log ('copy[this.state.selected]: ',copy[this.state.selected])
//      console.log('copy[this.state.best]: ',copy[this.state.best])
      if (copy[this.state.selected] > copy[this.state.best]){
        newBest=this.state.selected
        return () => {
          this.setState({best: newBest})
          this.setState({votes: copy})
        }
      }
      else {
        console.log('in else')
        return () => this.setState({votes: copy})
      }
    
  }

  render() {
//    console.log('best: ', this.state.best)
//    console.log(this.state.votes)
    return (
        <div>
            <ShowAnec anecdote={this.props.anecdotes[this.state.selected]} votes={this.state.votes[this.state.selected]} best = {false} />
            <div>
              <Button handleClick={this.loadNew()} text='Next anecdote' />
              <Button handleClick={this.voteThis()} text= 'Vote'/>
            </div>
            <ShowAnec anecdote={this.props.anecdotes[this.state.best]} votes={this.state.votes[this.state.best]} best={true} />
        </div>
    )
  }
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const ShowAnec = ({anecdote, votes, best}) => {
  if(best === false){
    return (
      <div>
        <p>{anecdote}</p>
        <p>has {votes} votes</p>
      </div>
    )
  }
  else {
    if (votes > 0){
      return(
        <div>
        <h3>Anecdote with most votes:</h3>
        <p>{anecdote}</p>
        <p>has {votes} votes</p>
        </div>
      )
    }
    else {
      return(
        null
      )
    }
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)