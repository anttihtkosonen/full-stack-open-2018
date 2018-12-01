import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { Container, Table, Grid, Image, Form, Button } from 'semantic-ui-react'

const Menu = () => {
  const style = {
    fontWeight: 'bold',
    backgroundColor: '#e5efff',
    padding: 20
  }
  const activeStyle = {
    backgroundColor: '#d1d1d1',
    padding: 25
  }
  return (
    <div style = {style}>
      <span >
        <NavLink exact to="/" activeStyle={activeStyle}>Anecdotes</NavLink> &nbsp;
        <NavLink to="/create" activeStyle={activeStyle}>Create new</NavLink> &nbsp;
        <NavLink to="/about" activeStyle={activeStyle}>About</NavLink>
      </span>
    </div>
  )
}


const Notification = ({ notification }) => {
  const style =  {
    display: notification.length === 0 ? 'none' : '',
    margin: '10px',
    color: '#B20000',
    width: 500,
    padding: '8px',
    borderStyle: 'solid',
    borderRadius: 10,
    borderWidth: 5
  }
  return(
    <div style={style} >
      {notification}
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => {
  const style = {
    paddingTop: 20
  }
  return(
    <div style = {style}>
      <h2>Anecdotes</h2>
      <Table striped celled>
        <Table.Body>
          {anecdotes.map(anecdote =>
            <Table.Row key={anecdote.id}>
              <Table.Cell>
                <NavLink to={`/anecdotes/${anecdote.id}`}>
                  {anecdote.content} 
                </NavLink>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
)}

const Anecdote = ({anecdote}) => {
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author} </h2>
      <p>has {anecdote.votes} votes </p>
      <p>for more info see {anecdote.info} </p>
    </div>
  )
}


const About = () => {
  const style = {
    fontStyle: 'italic',
    margin: 15
  }
  const titleStyle = {
    paddingTop: 20
  }  
  return (
  <div>
    <h2 style = {titleStyle}>About anecdote app</h2>
    <Grid columns='two' divided>
      <Grid.Column>
        <p>According to Wikipedia:</p>
        <p style = {style}>An anecdote is a brief, revealing account of an individual person or an incident. 
              Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
              such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
              An anecdote is "a story with a point."</p>
        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </Grid.Column>
      <Grid.Column>
        <Image size='medium' src='https://upload.wikimedia.org/wikipedia/commons/2/23/Dennis_Ritchie_2011.jpg' />
      </Grid.Column>
    </Grid>
  </div>
  )
}

const Footer = () => {
 const style= {
   paddingTop: 20
 }
  return (
    <div style = {style}>
      Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

      See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
    </div>
  )}

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.showNotification(`a new anecdote '${this.state.content}' created!`,10000)
    this.props.history.push('/')
  }


  render() {
    const style = {
      paddingTop: 20
    }
    return(
      <div>
        <h2 style = {style}>Create a new anecdote</h2>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>Content</label>
              <input name='content' value={this.state.content} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Author</label>
              <input name='author' value={this.state.author} onChange={this.handleChange} />
            </Form.Field>
            <Form.Field>
              <label>Url for more info</label>
              <input name='info' value={this.state.info} onChange={this.handleChange} />
            </Form.Field>            
            <Button type='submit'>Create</Button>
          </Form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }


  showNotification =(content, timeout) => {
    this.setState({ notification: content })
    setTimeout(() => {
      this.setState({ notification: '' })
    }, timeout)
  }

  render() {
    const style = {
      paddingBottom: 20,
      paddingTop: 20
    }
    return (
      <Container>
        <div>
          <Router>
            <div>
              <h1 style= {style}>Software anecdotes</h1>
              <Menu />
              <Notification notification= {this.state.notification}/>
              <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
              <Route exact path="/create" render={({history}) => 
                <CreateNew history={history} addNew={this.addNew} showNotification={this.showNotification} />} />
              <Route exact path="/about" render={() => <About />} /> 
              <Route exact path="/anecdotes/:id" render={({match}) => 
                <Anecdote anecdote={this.anecdoteById(match.params.id)}  /> }
              />
              <Footer />
            </div>
          </Router>
        </div>
      </Container>
    );
  }
}

export default App;
