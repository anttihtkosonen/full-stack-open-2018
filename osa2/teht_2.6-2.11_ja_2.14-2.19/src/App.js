import React from 'react';
import Filter from './components/Filter';
import ShowPersons from './components/ShowPersons';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456', id:1 },
        { name: 'Martti Tienari', number: '040-123456', id: 2 },
        { name: 'Arto Järvinen', number: '040-123456', id: 3 },
        { name: 'Lea Kutvonen', number: '040-123456', id: 4 }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObj ={
      name: this.state.newName,
      number: this.state.newNum,
      id: this.state.persons.length +1
    }

    const nimet = this.state.persons.map(person => person.name)

    if (nimet.includes(this.state.newName) ===false) {
      const persons = this.state.persons.concat(personObj)
  
      this.setState({
        persons: persons,
        newName: '',
        newNum: ''
      })     
    }  
    else  (
      alert ("Henkilö on jo listalla")
    )
  } 

  handleAddPerson = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value })
  }

  handleAddNum = (event) => {
    console.log(event.target.value)
    this.setState({ newNum: event.target.value })
  }

  handleFind =(event) => {
    console.log(event.target.value)
    this.setState({ filter: event.target.value })
  }

  findPerson = (person) => {
    const personData=person.name+' '+person.number
    return this.state.filter.length === 0 || personData.match(new RegExp(this.state.filter, 'i'))
  }


  render() {
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <form onSubmit={this.findPerson} >
          <Filter value={this.state.filter} filterFunction = {this.handleFind} />
        </form>
        <h2>Lisää uusi</h2>
        <form onSubmit={this.addPerson} >
          <div>
            nimi: <input 
              value = {this.state.newName} 
              onChange={this.handleAddPerson}
              />
          </div>
          <div>
            numero: <input 
              value = {this.state.newNum} 
              onChange={this.handleAddNum}
            />
          </div>          
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ShowPersons search = {person => this.findPerson(person)} persons = {this.state.persons} />
      </div>
    )
  }
}

export default App